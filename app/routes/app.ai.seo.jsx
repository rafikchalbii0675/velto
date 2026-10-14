import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { checkIA } from "../utils/checkIA.server";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  return { iaLevel: "ALLOWED" };
}

export default function AiSeo() {
  const { iaLevel } = useLoaderData();

  return (
    <VeltoLayout title="SEO IA Avancé">
      <div className="space-y-6">

        <p className="text-gray-700">
          Optimisation SEO IA pour vos produits et collections.
        </p>

        {iaLevel === "ALLOWED" && (
          <div className="p-6 bg-green-100 border border-green-300 rounded-xl">
            <h2 className="text-xl font-bold text-green-900">
              IA SEO activée (PRO / PREMIUM)
            </h2>
            <p className="mt-2 text-green-800">
              Analyse des mots-clés, optimisation automatique, suggestions IA.
            </p>
          </div>
        )}

        <div className="p-6 bg-white shadow rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Optimisation SEO IA
          </h3>
          <p className="mt-2 text-gray-600">
            Génération de descriptions optimisées, titres SEO, mots-clés IA.
          </p>
<div
  className={`px-3 py-1 rounded-full text-white inline-block ${
    iaLevel === "PREMIUM" ? "bg-purple-600" : "bg-blue-600"
  }`}
>
  {iaLevel}
</div>

          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            Lancer l’optimisation IA
          </button>
        </div>

      </div>
    </VeltoLayout>
  );
}

