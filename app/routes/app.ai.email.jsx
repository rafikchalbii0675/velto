import { useLoaderData, useActionData, Form } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { checkIA } from "../utils/checkIA.server";
import { json, redirect } from "@remix-run/node";
import OpenAI from "openai";
import { prisma } from "../utils/db.server";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const url = new URL(request.url);
  const plan = url.searchParams.get("plan") || "PRO";

  return { iaLevel: plan };
}

export async function action({ request }) {
  const form = await request.formData();
  const productName = form.get("productName");
  const iaLevel = form.get("iaLevel");

  const userId = "merchant";

  // 1️⃣ Vérification des crédits IA
  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  if (!credits || credits.credits <= 0) {
    return redirect("/app/ai/credits");
  }

  // 2️⃣ Prompt IA PRO / PREMIUM
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt = "";

  if (iaLevel === "PRO") {
    prompt = `
Tu es Velto IA Email PRO.

Produit : ${productName}

Donne :
- 3 emails marketing
- 3 relances panier
- 3 newsletters
- 3 emails de bienvenue
    `;
  }

  if (iaLevel === "PREMIUM") {
    prompt = `
Tu es Velto IA Email PREMIUM.

Produit : ${productName}

Donne :
- 5 emails marketing avancés
- 5 relances panier psychologiques
- 5 newsletters premium
- 5 séquences automatisées
- Analyse IA du ton de marque
- Recommandations IA pour scaling email
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

  // 4️⃣ Log IA
  await prisma.iaLog.create({
    data: {
      userId,
      module: "email",
      input: productName,
      output: result,
    },
  });

  return json({ result, iaLevel });
}

export default function AiEmail() {
  const { iaLevel } = useLoaderData();
  const actionData = useActionData();

  const level = actionData?.iaLevel || iaLevel;

  return (
    <VeltoLayout title="IA Email – Velto">
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
          Génération IA d’emails marketing, newsletters et relances panier.
        </p>

        {/* Bloc niveau IA */}
        <div className="p-6 bg-indigo-100 border border-indigo-300 rounded-xl">
          <h2 className="text-xl font-bold text-indigo-900">
            IA Email {level}
          </h2>
          <p className="mt-2 text-indigo-800">
            Niveau IA : {level === "PREMIUM" ? "Avancé" : "Standard"}
          </p>
        </div>

        {/* Formulaire IA */}
        <div className="p-6 bg-white shadow rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Générer des emails IA
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <input type="hidden" name="iaLevel" value={level} />

            <input
              type="text"
              name="productName"
              placeholder="Nom du produit"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
              Générer les emails IA
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {actionData?.result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Résultats IA Email :
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
