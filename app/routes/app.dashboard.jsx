import { useLoaderData, useRouteError } from "@remix-run/react";

import VeltoLayout from "~/components/velto/VeltoLayout";
import { authenticate } from "~/shopify.server";

const PRODUCTS_PER_PAGE = 250; // maximum autorisé par l'API Shopify
const MAX_PAGES = 40; // garde-fou : jusqu'à 10 000 produits, évite une boucle infinie

async function fetchAllActiveProductsWithStock(admin) {
  let allProducts = [];
  let cursor = null;
  let hasNextPage = true;
  let pageCount = 0;

  while (hasNextPage && pageCount < MAX_PAGES) {
    const response = await admin.graphql(
      `#graphql
        query ($first: Int!, $after: String) {
          products(first: $first, after: $after, query: "status:active") {
            edges {
              cursor
              node {
                id
                title
                variants(first: 50) {
                  edges {
                    node {
                      inventoryQuantity
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `,
      { variables: { first: PRODUCTS_PER_PAGE, after: cursor } }
    );

    const json = await response.json();

    if (json.errors) {
      console.error("Erreur GraphQL products (pagination stock):", JSON.stringify(json.errors, null, 2));
      break;
    }

    const edges = json.data?.products?.edges ?? [];

    allProducts = allProducts.concat(edges);
    hasNextPage = json.data?.products?.pageInfo?.hasNextPage ?? false;
    cursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    pageCount += 1;
  }

  return allProducts;
}

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  const [productsCountResponse, discountsResponse, allProductEdges] =
    await Promise.all([
      admin.graphql(`#graphql
        query {
          productsCount(query: "status:active") {
            count
          }
        }
      `),
      admin.graphql(`#graphql
        query {
          codeDiscountNodes(first: 50, query: "status:active") {
            edges {
              node {
                id
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `),
      fetchAllActiveProductsWithStock(admin),
    ]);

  const [productsCountJson, discountsJson] = await Promise.all([
    productsCountResponse.json(),
    discountsResponse.json(),
  ]);

  if (productsCountJson.errors) {
    console.error("Erreur GraphQL productsCount:", JSON.stringify(productsCountJson.errors, null, 2));
  }
  if (discountsJson.errors) {
    console.error("Erreur GraphQL codeDiscountNodes:", JSON.stringify(discountsJson.errors, null, 2));
  }

  const totalProducts = productsCountJson.data?.productsCount?.count ?? 0;

  const discountEdges = discountsJson.data?.codeDiscountNodes?.edges ?? [];
  const discountsHasMore =
    discountsJson.data?.codeDiscountNodes?.pageInfo?.hasNextPage ?? false;
  const totalPromotions = discountEdges.length;

  const lowStock = allProductEdges
    .map(({ node }) => {
      const lowestVariantStock = node.variants.edges.reduce(
        (min, { node: variant }) =>
          Math.min(min, variant.inventoryQuantity ?? 0),
        Infinity
      );
      return { id: node.id, title: node.title, stock: lowestVariantStock };
    })
    .filter((p) => p.stock < 5);

  return Response.json(
    { totalProducts, totalPromotions, discountsHasMore, lowStock },
    {
      headers: {
        "Content-Security-Policy": shop
          ? `frame-ancestors https://${shop} https://admin.shopify.com;`
          : "frame-ancestors https://admin.shopify.com;",
      },
    }
  );
}

export default function DashboardPage() {
  const { totalProducts, totalPromotions, discountsHasMore, lowStock } =
    useLoaderData();

  return (
    <VeltoLayout title="Dashboard">
      <div
        className="velto-page-bg"
        style={{
          padding: "var(--velto-space-xl)",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="velto-title-lg" style={{ marginBottom: "var(--velto-space-lg)" }}>
          Velto Dashboard
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--velto-space-lg)" }}>
          <div className="velto-card">
            <h3 className="velto-title-md">Produits actifs</h3>
            <p>{totalProducts}</p>
          </div>

          <div className="velto-card">
            <h3 className="velto-title-md">Promotions actives</h3>
            <p>{totalPromotions}{discountsHasMore ? "+" : ""}</p>
          </div>

          <div className="velto-card">
            <h3 className="velto-title-md">Stock faible</h3>
            {lowStock.length === 0 && <p>Aucun produit en stock faible.</p>}
            {lowStock.map((p) => (
              <p key={p.id}>{p.title} — {p.stock} en stock</p>
            ))}
          </div>
        </div>
      </div>
    </VeltoLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Dashboard ErrorBoundary:", error);

  return (
    <VeltoLayout title="Erreur">
      <div style={{ padding: "var(--velto-space-xl)" }}>
        <h1 className="velto-title-lg">Une erreur est survenue</h1>
        <p>{error?.statusText || error?.message || "Erreur inconnue"}</p>
      </div>
    </VeltoLayout>
  );
}