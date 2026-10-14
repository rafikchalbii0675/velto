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
  const niche = form.get("niche");
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
Tu es Velto IA Dropshipping PRO.

Niche : ${niche}

Donne :
- 3 produits gagnants potentiels
- 3 angles marketing
- 3 idées de vidéos UGC
- 3 audiences Meta/TikTok
    `;
  }

  if (iaLevel === "PREMIUM") {
    prompt = `
Tu es Velto IA Dropshipping PREMIUM.

Niche : ${niche}

Donne :
- 5 produits gagnants avancés
- 5 angles marketing puissants
- 5 scripts UGC détaillés
- 5 audiences IA avancées
- Analyse IA du marché mondial
- Recommandations IA pour scaling dropshipping
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
      module: "dropshipping",
      input: niche,
      output: result,
    },
  });

  return json({ result, iaLevel });
}

export default function AiDropshipping() {
  const { iaLevel } = useLoaderData();
  const actionData = useActionData();

  const level = actionData?.iaLevel || iaLevel;

  return (
    <VeltoLayout title="IA Dropshipping – Velto">
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
          Analyse IA des niches et produits gagnants pour votre boutique.
        </p>

        {/* Bloc niveau IA */}
        <div className="p-6 bg-teal-100 border border-teal-300 rounded-xl">
          <h2 className="text-xl font-bold text-teal-900">
            IA Dropshipping {level}
          </h2>
          <p className="mt-2 text-teal-800">
            Niveau IA : {level === "PREMIUM" ? "Avancé" : "Standard"}
          </p>
        </div>

        {/* Formulaire IA */}
        <div className="p-6 bg-white shadow rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Analyse IA de votre niche
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <input type="hidden" name="iaLevel" value={level} />

            <input
              type="text"
              name="niche"
              placeholder="Ex : animaux, fitness, beauté…"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />

            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">
              Lancer l’analyse IA
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {actionData?.result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Résultats IA Dropshipping :
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
