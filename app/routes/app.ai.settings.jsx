import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../utils/db.server";
import { checkIA } from "../utils/checkIA.server";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const userId = "merchant"; // À remplacer plus tard par l’ID Shopify

  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  // TODO: plus tard, récupérer le vrai plan depuis Shopify / DB
  const plan = "PRO";

  return {
    credits: credits?.credits || 0,
    plan,
  };
}

export default function AiSettings() {
  const { credits, plan } = useLoaderData();

  return (
    <VeltoLayout title="Paramètres IA – Velto">
      <div className="space-y-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Paramètres IA
        </h2>

        <p className="text-gray-600">
          Gérez votre plan IA, vos crédits et vos accès aux modules IA.
        </p>

        {/* Plan IA */}
        <div className="p-6 bg-amber-100 border border-amber-300 rounded-xl">
          <h3 className="text-xl font-bold text-amber-900">
            Plan IA actuel : {plan}
          </h3>
          <p className="text-amber-800 mt-2">
            Le plan IA détermine le niveau de puissance des modules IA.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/app/billing/pro"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Passer à PRO
            </a>
            <a
              href="/app/billing/premium"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Passer à PREMIUM
            </a>
          </div>
        </div>

        {/* Crédits IA */}
        <div className="p-6 bg-blue-100 border border-blue-300 rounded-xl">
          <h3 className="text-xl font-bold text-blue-900">
            Crédits IA disponibles : {credits}
          </h3>
          <p className="text-blue-800 mt-2">
            Chaque analyse IA consomme 1 crédit.  
            Vous pouvez augmenter vos crédits avec les plans PRO et PREMIUM.
          </p>

          <a
            href="/app/ai/credits"
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
          >
            Voir la page Crédits IA
          </a>
        </div>

        {/* Accès rapide IA */}
        <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">
            Accès rapide IA
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/app/ai/logs"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Historique IA
            </a>
            <a
              href="/app/ai"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              IA Hub
            </a>
            <a
              href="/app/ai/dashboard"
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              Dashboard IA
            </a>
          </div>
        </div>

      </div>
    </VeltoLayout>
  );
}
