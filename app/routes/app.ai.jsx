import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../utils/db.server";
import { checkIA } from "../utils/checkIA.server";

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

export default function AiHub() {
  const { credits } = useLoaderData();

  const modules = [
    { label: "IA Produits", to: "/app/ai/products", color: "bg-orange-100", text: "text-orange-900" },
    { label: "IA SEO", to: "/app/ai/seo", color: "bg-blue-100", text: "text-blue-900" },
    { label: "IA Marché", to: "/app/ai/market", color: "bg-green-100", text: "text-green-900" },
    { label: "IA Tendances", to: "/app/ai/tendances", color: "bg-purple-100", text: "text-purple-900" },
    { label: "IA Opportunités Produits", to: "/app/ai/opportunities", color: "bg-yellow-100", text: "text-yellow-900" },
    { label: "IA Dropshipping", to: "/app/ai/dropshipping", color: "bg-teal-100", text: "text-teal-900" },
    { label: "IA Publicités Meta/TikTok", to: "/app/ai/ads", color: "bg-pink-100", text: "text-pink-900" },
    { label: "IA Email", to: "/app/ai/email", color: "bg-indigo-100", text: "text-indigo-900" },
    { label: "IA Crypto", to: "/app/ai/crypto", color: "bg-red-100", text: "text-red-900" },
  ];

  const shopifyIa = [
    { label: "Produits Shopify IA", to: "/app/shopify/products", color: "bg-green-100", text: "text-green-900" },
    { label: "Créer produit IA", to: "/app/shopify/product/create", color: "bg-emerald-100", text: "text-emerald-900" },
  ];

  const system = [
    { label: "Crédits IA", to: "/app/ai/credits", color: "bg-blue-200", text: "text-blue-900" },
    { label: "Historique IA", to: "/app/ai/logs", color: "bg-gray-200", text: "text-gray-900" },
    { label: "Paramètres IA", to: "/app/ai/settings", color: "bg-amber-200", text: "text-amber-900" },
    { label: "Dashboard IA", to: "/app/ai/dashboard", color: "bg-lime-200", text: "text-lime-900" },
  ];

  return (
    <VeltoLayout title="Velto – IA Hub">
      <div className="space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Velto IA Hub</h1>
          <p className="text-gray-600 mt-2">
            Accédez à tous vos modules IA et à l’intégration directe avec votre boutique Shopify.
          </p>
        </div>

        {/* Crédits IA */}
        <div className="p-6 bg-blue-100 border border-blue-300 rounded-xl">
          <h2 className="text-xl font-bold text-blue-900">
            Crédits IA disponibles : {credits}
          </h2>
          <p className="text-blue-800 mt-1">
            Chaque analyse IA consomme 1 crédit.
          </p>
        </div>

        {/* Intégration Shopify IA */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Intégration Shopify IA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shopifyIa.map((s) => (
              <a
                key={s.to}
                href={s.to}
                className={`p-6 rounded-xl border shadow-sm ${s.color} ${s.text} hover:shadow-md transition`}
              >
                <h4 className="text-lg font-bold">{s.label}</h4>
                <p className="text-sm mt-2 opacity-80">
                  Ouvrir le module
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Modules IA */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Modules IA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => (
              <a
                key={m.to}
                href={m.to}
                className={`p-6 rounded-xl border shadow-sm ${m.color} ${m.text} hover:shadow-md transition`}
              >
                <h4 className="text-lg font-bold">{m.label}</h4>
                <p className="text-sm mt-2 opacity-80">
                  Accéder au module
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Système IA */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Système IA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {system.map((s) => (
              <a
                key={s.to}
                href={s.to}
                className={`p-6 rounded-xl border shadow-sm ${s.color} ${s.text} hover:shadow-md transition`}
              >
                <h4 className="text-lg font-bold">{s.label}</h4>
                <p className="text-sm mt-2 opacity-80">
                  Ouvrir
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </VeltoLayout>
  );
}
