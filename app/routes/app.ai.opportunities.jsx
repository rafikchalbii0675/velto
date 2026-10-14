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
  const productList = form.get("productList");
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
Tu es Velto IA Opportunités Produits PRO.

Liste de produits :
${productList}

Donne :
- 3 produits à prioriser
- 3 opportunités d’optimisation
- 3 idées de bundles
- 3 recommandations IA pour augmenter le panier moyen
    `;
  }

  if (iaLevel === "PREMIUM") {
    prompt = `
Tu es Velto IA Opportunités Produits PREMIUM.

Liste de produits :
${productList}

Donne :
- 5 produits à prioriser
- 5 opportunités avancées
- 5 idées de bundles premium
- Analyse IA des marges et du potentiel
- Recommandations IA pour scaling des meilleures références
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
      module: "opportunities",
      input: productList,
      output: result,
    },
  });

  return json({ result, iaLevel });
}

export default function AiOpportunities() {
  const { iaLevel } = useLoaderData();
  const actionData = useActionData();

  const level = actionData?.iaLevel || iaLevel;

  return (
    <VeltoLayout title="IA Opportunités Produits – Velto">
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
          Analyse IA des produits à prioriser et des opportunités à exploiter.
        </p>

        {/* Bloc niveau IA */}
        <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-xl">
          <h2 className="text-xl font-bold text-yellow-900">
            IA Opportunités Produits {level}
          </h2>
          <p className="mt-2 text-yellow-800">
            Niveau IA : {level === "PREMIUM" ? "Avancé" : "Standard"}
          </p>
        </div>

        {/* Formulaire IA */}
        <div className="p-6 bg-white shadow rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Liste de produits à analyser
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <input type="hidden" name="iaLevel" value={level} />

            <textarea
              name="productList"
              placeholder={"Ex :\n- Produit 1\n- Produit 2\n- Produit 3"}
              className="w-full border border-gray-300 rounded-lg p-2 h-32"
              required
            />

            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
              Lancer l’analyse IA
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {actionData?.result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Résultats IA Opportunités Produits :
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
