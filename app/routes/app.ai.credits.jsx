import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../utils/db.server";

export async function loader() {
  const userId = "merchant"; // À remplacer plus tard par l’ID Shopify

  const credits = await prisma.iaCredits.findUnique({
    where: { userId },
  });

  return { credits: credits?.credits || 0 };
}

export default function AiCredits() {
  const { credits } = useLoaderData();

  return (
    <VeltoLayout title="Crédits IA – Velto">
      <div className="space-y-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Crédits IA disponibles
        </h2>

        <p className="text-gray-600">
          Chaque analyse IA consomme 1 crédit.  
          Les abonnements PRO et PREMIUM offrent plus de puissance IA.
        </p>

        {/* Bloc crédits */}
        <div className="p-6 bg-red-100 border border-red-300 rounded-xl">
          <h3 className="text-xl font-bold text-red-900">
            Crédits restants : {credits}
          </h3>

          {credits <= 0 && (
            <p className="mt-2 text-red-800 font-semibold">
              Vous n’avez plus de crédits IA.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">

          <a
            href="/app/billing/pro"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center"
          >
            Passer à PRO
          </a>

          <a
            href="/app/billing/premium"
            className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-center"
          >
            Passer à PREMIUM
          </a>

        </div>

      </div>
    </VeltoLayout>
  );
}
