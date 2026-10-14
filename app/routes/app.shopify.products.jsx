import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { authenticate } from "../shopify.server";
import { prisma } from "../utils/db.server";
import { checkIA } from "../utils/checkIA.server";
import OpenAI from "openai";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const { admin } = await authenticate.admin(request);

  const products = await admin.rest.resources.Product.all({
    limit: 50,
  });

  const userId = "merchant";

  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  return {
    products: products.data,
    credits: credits?.credits || 0,
  };
}

export default function ShopifyProducts() {
  const { products, credits } = useLoaderData();

  return (
    <VeltoLayout title="Produits Shopify – Velto IA">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Produits Shopify
          </h2>
          <p className="text-gray-600">
            Analyse IA, optimisation, duplication et création de nouveaux produits.
          </p>
        </div>

        {/* Crédits IA */}
        <div className="p-6 bg-blue-100 border border-blue-300 rounded-xl">
          <h3 className="text-xl font-bold text-blue-900">
            Crédits IA disponibles : {credits}
          </h3>
          <p className="text-blue-800 mt-2">
            Chaque action IA consomme 1 crédit.
          </p>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </VeltoLayout>
  );
}

function ProductCard({ product }) {
  const image = product.images?.[0]?.src;

  // Badges IA (simple logique pour commencer)
  const badge = getBadge(product);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">

      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
      )}

      {/* Titre */}
      <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>

      {/* Prix */}
      <p className="text-gray-600 mt-1">
        Prix : {product.variants?.[0]?.price || "N/A"}$
      </p>

      {/* Stock */}
      <p className="text-gray-600">
        Stock : {product.variants?.[0]?.inventory_quantity ?? "N/A"}
      </p>

      {/* Badge IA */}
      <span className={`inline-block mt-3 px-3 py-1 rounded-full text-white text-sm ${badge.color}`}>
        {badge.label}
      </span>

      {/* Boutons IA */}
      <div className="mt-4 space-y-2">

        <a
          href={`/app/shopify/product/optimize?id=${product.id}`}
          className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-center"
        >
          Optimiser avec IA
        </a>

        <a
          href={`/app/shopify/product/duplicate?id=${product.id}`}
          className="block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-center"
        >
          Dupliquer avec IA
        </a>

        <a
          href={`/app/shopify/product/auto?id=${product.id}`}
          className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-center"
        >
          Auto‑Optimisation IA
        </a>
      </div>
    </div>
  );
}

function getBadge(product) {
  const stock = product.variants?.[0]?.inventory_quantity ?? 0;
  const price = parseFloat(product.variants?.[0]?.price || 0);

  if (stock > 50) return { label: "Fort", color: "bg-green-600" };
  if (stock < 5) return { label: "Faible", color: "bg-red-600" };
  if (price > 100) return { label: "Premium", color: "bg-purple-600" };
  return { label: "Standard", color: "bg-gray-600" };
}
