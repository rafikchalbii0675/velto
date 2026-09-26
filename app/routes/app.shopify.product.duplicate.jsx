import { useLoaderData, useActionData, Form } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { authenticate } from "../shopify.server";
import { prisma } from "../utils/db.server";
import { checkIA } from "../utils/checkIA.server";
import { json, redirect } from "@remix-run/node";
import OpenAI from "openai";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return redirect("/app/shopify/products");
  }

  const { admin } = await authenticate.admin(request);

  const product = await admin.rest.resources.Product.find({ id });

  const userId = "merchant";

  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  return {
    product: product.data,
    credits: credits?.credits || 0,
  };
}

export async function action({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const form = await request.formData();
  const id = form.get("id");

  const { admin } = await authenticate.admin(request);

  const product = await admin.rest.resources.Product.find({ id });

  const userId = "merchant";

  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  if (!credits || credits.credits <= 0) {
    return redirect("/app/ai/credits");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
Tu es Velto IA Duplication Produit.

Voici un produit Shopify :

Titre : ${product.data.title}
Description : ${product.data.body_html}
Prix : ${product.data.variants?.[0]?.price || "N/A"}
Tags : ${product.data.tags}
Collections : ${product.data.product_type}

Génère une version améliorée :
- Nouveau titre optimisé SEO
- Nouvelle description complète (storytelling + bénéfices + bullet points)
- Liste de mots-clés SEO
- Suggestion de prix optimal
- Tags optimisés
- Positionnement IA (tendance / opportunité / hors saison / fort / faible)
- Un texte court pour l’image principale (alt text SEO)
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const result = completion.choices[0].message.content;

  // Déduire crédit IA
  await prisma.iaCredits.update({
    where: { userId },
    data: { credits: credits.credits - 1 },
  });

  // Log IA
  await prisma.iaLog.create({
    data: {
      userId,
      module: "shopify_product_duplicate",
      input: product.data.title,
      output: result,
    },
  });

  return json({ result, product: product.data });
}

export default function ShopifyProductDuplicate() {
  const { product, credits } = useLoaderData();
  const actionData = useActionData();

  const result = actionData?.result;

  return (
    <VeltoLayout title="Dupliquer produit avec IA – Velto">
      <div className="space-y-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Dupliquer le produit avec IA
        </h2>

        <p className="text-gray-600">
          Velto IA génère une version améliorée du produit.
        </p>

        {/* Produit original */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">
            Produit original
          </h3>

          <p className="mt-2 text-gray-700">
            <strong>Titre :</strong> {product.title}
          </p>
          <p className="mt-1 text-gray-700">
            <strong>Prix :</strong> {product.variants?.[0]?.price || "N/A"}$
          </p>
          <p className="mt-1 text-gray-700">
            <strong>Tags :</strong> {product.tags || "Aucun"}
          </p>
        </div>

        {/* Crédits IA */}
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-xl">
          <p className="text-blue-900 font-semibold">
            Crédits IA disponibles : {credits}
          </p>
        </div>

        {/* Formulaire IA */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800">
            Générer la version IA dupliquée
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <input type="hidden" name="id" value={product.id} />

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
              Générer la duplication IA
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Version IA dupliquée :
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {result}
            </pre>
          </div>
        )}

      </div>
    </VeltoLayout>
  );
}
