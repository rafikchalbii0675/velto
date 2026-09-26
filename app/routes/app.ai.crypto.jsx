import { useLoaderData, useActionData, Form } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { checkIA } from "../utils/checkIA.server";
import { json, redirect } from "@remix-run/node";
import OpenAI from "openai";
import { prisma } from "../utils/db.server";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  // Ici tu peux récupérer le plan réel depuis ta DB ou Shopify
  const url = new URL(request.url);
  const plan = url.searchParams.get("plan") || "PRO";

  return { iaLevel: plan };
}

export async function action({ request }) {
  const form = await request.formData();
  const productName = form.get("productName");
  const iaLevel = form.get("iaLevel");

  const userId = "merchant"; // à remplacer plus tard par l’ID réel du marchand

  // 1️⃣ Vérification des crédits IA
  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  if (!credits || credits.credits <= 0) {
    return redirect("/app/ai/credits");
  }

  // 2️⃣ Préparation du prompt IA selon PRO / PREMIUM
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt = "";

  if (iaLevel === "PRO") {
    prompt = `
Tu es Velto IA Crypto PRO.

Produit : ${productName}

Donne :
- Opportunités crypto liées au produit
- Segments de clients sensibles aux crypto-actifs
- Idées de campagnes marketing crypto
- Recommandations IA pour la boutique Shopify
    `;
  }

  if (iaLevel === "PREMIUM") {
    prompt = `
Tu es Velto IA Crypto PREMIUM.

Produit : ${productName}

Donne :
- Opportunités crypto avancées
- Segments de clients sensibles aux crypto-actifs
- Idées marketing crypto avancées
- Prédictions IA sur les tendances crypto
- Analyse IA du marché mondial crypto
- Opportunités de paiement crypto avancées
- Stratégies IA premium pour booster les ventes
    `;
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const result = completion.choices[0].message.content;

  // 3️⃣ Déduire 1 crédit IA
  await prisma.iaCredits.update({
    where: { userId },
    data: { credits: credits.credits - 1 },
  });

  // 4️⃣ Log IA (historique)
  await prisma.iaLog.create({
    data: {
      userId,
      module: "crypto",
      input: productName,
      output: result,
    },
  });

  return json({ result, iaLevel });
}

export default function AiCrypto() {
  const { iaLevel } = useLoaderData();
  const actionData = useActionData();

  const level = actionData?.iaLevel || iaLevel;

  return (
    <VeltoLayout title="IA Crypto – Velto">
      <div className="space-y-6">

        {/* Badge PRO / PREMIUM */}
        <div>
          <span
            className={`px-3 py-1 rounded-full text-white inline-block ${
              level === "PREMIUM" ? "bg-purple-600" : "bg-blue-600"
            }`}
          >
            {level}
          </span>
        </div>

        {/* Intro */}
        <p className="text-gray-700">
          Ce module utilise l’IA pour analyser les tendances crypto et les
          opportunités liées à votre boutique.
        </p>

        {/* Bloc niveau IA */}
        <div className="p-6 bg-indigo-100 border border-indigo-300 rounded-xl">
          <h2 className="text-xl font-bold text-indigo-900">
            IA Crypto {level}
          </h2>
          <p className="mt-2 text-indigo-800">
            Niveau IA : {level === "PREMIUM" ? "Avancé" : "Standard"}
          </p>
        </div>

        {/* Formulaire IA */}
        <div className="p-6 bg-white shadow rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Analyse IA Crypto pour votre boutique
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <input type="hidden" name="iaLevel" value={level} />

            <input
              type="text"
              name="productName"
              placeholder="Nom du produit à analyser"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
              Lancer l’analyse IA Crypto
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {actionData?.result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Résultat IA Crypto :
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {actionData.result}
            </pre>
          </div>
        )}

      </div>
    </VeltoLayout>
  );
}
