// app/routes/products.jsx

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import VeltoLayout from "../components/velto/VeltoLayout";

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);

  // Exemple : récupérer les produits Shopify
  const products = await admin.rest.resources.Product.all({
    session,
    limit: 20,
  });

  return json({ products: products.data });
}

export default function Products() {
  const { products } = useLoaderData();

  return (
    <VeltoLayout>
      <main style={{ padding: "20px" }}>
        <h1>Produits</h1>

        {products.map((p) => (
          <div key={p.id} style={{ marginBottom: "12px" }}>
            <strong>{p.title}</strong>
          </div>
        ))}
      </main>
    </VeltoLayout>
  );
}
