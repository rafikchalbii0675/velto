import { useActionData, Form } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { authenticate } from "../shopify.server";
import { prisma } from "../utils/db.server";
import { checkIA } from "../utils/checkIA.server";
import { json, redirect } from "@remix-run/node";
import OpenAI from "openai";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const userId = "merchant";

  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  return {
    credits: credits?.credits || 0,
  };
}

export async function action({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const form = await request.formData();
  const idea = form.get("idea");

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
Tu es Velto IA Création Produit.

Idée de produit : ${idea}

Génère :
- Un titre optimisé SEO
- Une description complète (storytelling + bénéfices + bullet points)
- Une liste de mots-clés SEO
- Une suggestion de prix optimal selon le marché
- Une liste de tags optimisés
- Un positionnement IA (tendance / opportunité / hors saison / fort / faible)
- Un texte alt SEO pour l’image principale
- Une courte description marketing pour Shopify
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
      module: "shopify_product_create",
      input: idea,
      output: result,
    },
  });

  // Extraire les données IA
  const lines = result.split("\n");

  const title = lines.find((l) => l.toLowerCase().includes("titre")) || "Produit IA";
  const description = result;
  const price = lines.find((l) => l.toLowerCase().includes("prix")) || "19.99";
  const tags = lines.find((l) => l.toLowerCase().includes("tags")) || "IA, Velto";
  const altText = lines.find((l) => l.toLowerCase().includes("alt")) || "Image produit IA";

  // Créer le produit dans Shopify
  const { admin } = await authenticate.admin(request);

  await admin.rest.resources.Product.create({
    title: title.replace("Titre :", "").trim(),
    body_html: description,
    tags: tags.replace("Tags :", "").trim(),
    images: [
      {
        src: "https://placehold.co/600x600?text=Velto+IA",
        alt: altText.replace("Alt :", "").trim(),
      },
    ],
    variants: [
      {
        price: price.replace("Prix :", "").trim(),
      },
    ],
  });

  return json({ result, created: true });
}

export default function ShopifyProductCreate() {
  const actionData = useActionData();

  return (
    <VeltoLayout title="Créer produit IA – Velto">
      <div className="space-y-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Création produit IA
        </h2>

        <p className="text-gray-600">
          Velto IA génère un produit complet et le crée automatiquement dans Shopify.
        </p>

        {/* Formulaire IA */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800">
            Décrire l’idée du produit
          </h3>

          <Form method="post" className="mt-4 space-y-4">
            <textarea
              name="idea"
              placeholder="Ex : bouteille isotherme premium, tapis de yoga écologique, bracelet minimaliste..."
              className="w-full border border-gray-300 rounded-lg p-3 h-32"
              required
            />

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
              Générer et créer le produit IA
            </button>
          </Form>
        </div>

        {/* Résultat IA */}
        {actionData?.result && (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Produit IA généré :
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {actionData.result}
            </pre>

            {actionData.created && (
              <p className="mt-4 text-green-700 font-semibold">
                ✔ Le produit IA a été créé dans Shopify !
              </p>
            )}
          </div>
        )}

      </div>
    </VeltoLayout>
  );
}
