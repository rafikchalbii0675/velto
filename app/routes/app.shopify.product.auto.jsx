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
Tu es Velto IA Auto-Optimisation Produit.

Voici un produit Shopify :

Titre : ${product.data.title}
Description : ${product.data.body_html}
Prix : ${product.data.variants?.[0]?.price || "N/A"}
Tags : ${product.data.tags}
Collections : ${product.data.product_type}

Ta mission :
- Proposer un nouveau titre optimisé SEO
- Proposer une nouvelle description complète (storytelling + bénéfices + bullet points)
- Proposer une liste de mots-clés SEO
- Proposer un prix optimal selon le marché
- Proposer des tags optimisés
- Proposer un positionnement (produit en avant / hors saison / tendance forte / opportunité / faible)
- Résumer en 3 lignes la stratégie IA pour ce produit
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
      module: "shopify_product_auto_optimize",
      input: product.data.title,
      output: result,
    },
  });

  // ⚠️ Ici, on ne pousse pas encore automatiquement dans Shopify
  // On reste pro : on montre la proposition IA, le marchand valide ensuite.
  return json({ result, product: product.data });
}

export default function ShopifyProductAutoOptimize() {
  const { product, credits } = useLoaderData();
  const actionData = useActionData();

  const result = actionData?.result;

  return (
    <VeltoLayout title="Auto-Optimisation IA – Velto">
      <div className="space-y-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Auto-Optimisation IA du produit
        </h2>

        <p className="text-gray-600">
          Velto IA analyse et propose automatiquement une optimisation complète du produit.
        </p>

        {/* Produit actuel */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">
            Produit actuel
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
        <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800">
            Lancer l’Auto-Optimisation IA
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <input type="hidden" name="id" value={product.id} />

            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
              Lancer l’Auto-Optimisation IA
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Proposition Auto-Optimisation IA :
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
