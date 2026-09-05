import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getHotProducts } from "~/models/products.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const products = await getHotProducts(shopId);

  return json({ products });
}

export default function HotProducts() {
  const { products } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Produits Chauds </h1>

      <section>
        {products.length === 0 && <p>Aucun produit chaud.</p>}

        {products.map((p) => (
          <div key={p.id} className="product-item hot">
            <strong>{p.title}</strong>
            <p>Score IA : {p.score}</p>
            <p>Ventes : {p.sales}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
