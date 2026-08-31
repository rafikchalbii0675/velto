import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getProducts } from "~/models/products.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const products = await getProducts(shopId);

  return json({ products });
}

export default function Products() {
  const { products } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Produits IA</h1>

      <section>
        {products.length === 0 && <p>Aucun produit.</p>}

        {products.map((p) => (
          <div key={p.id} className="product-item">
            <strong>{p.title}</strong>
            <p>Prix : {p.price} $</p>
            <p>Ventes : {p.sales}</p>
            <p>Score IA : {p.score}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
