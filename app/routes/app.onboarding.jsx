import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import VeltoLayout from "../components/velto/VeltoLayout";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return json({ error: "No session found" });
  }

  // Ici tu peux plus tard vérifier si l'onboarding est déjà complété
  return json({ shop: session.shop });
};

export default function OnboardingPage() {
  const data = useLoaderData();

  return (
    <VeltoLayout title="Bienvenue sur Velto">
      <div className="space-y-8 max-w-3xl mx-auto">

        {/* Header */}
        <section className="p-6 bg-gradient-to-r from-amber-200 to-amber-300 rounded-xl shadow-lg border border-amber-400">
          <h1 className="text-3xl font-bold text-amber-900">
            Bienvenue, {data.shop}
          </h1>
          <p className="mt-2 text-amber-800">
            Velto va analyser votre boutique et vous aider à prendre de meilleures décisions.
          </p>
        </section>

        {/* Étapes */}
        <section className="p-6 bg-white rounded-xl shadow border border-gray-200 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Étapes de démarrage</h2>

          <ol className="space-y-3 text-gray-700 list-decimal list-inside">
            <li>
              Vérifiez vos <strong>produits</strong> et vos <strong>promotions</strong> dans Shopify.
            </li>
            <li>
              Ouvrez le <strong>Dashboard Velto</strong> pour voir les ventes des 7 derniers jours.
            </li>
            <li>
              Consultez la page <strong>Analyse AI</strong> pour un résumé intelligent de votre boutique.
            </li>
            <li>
              Activez les <strong>notifications</strong> pour suivre les événements importants.
            </li>
          </ol>
        </section>

        {/* Boutons de navigation */}
        <section className="flex flex-wrap gap-4">
          <Link
            to="/app.dashboard"
            className="px-4 py-2 rounded-lg bg-amber-600 text-white font-bold shadow hover:bg-amber-700 transition"
          >
            Aller au Dashboard
          </Link>

          <Link
            to="/app.ai"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
          >
            Voir l’analyse AI
          </Link>

          <Link
            to="/app.notifications"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white font-bold shadow hover:bg-gray-900 transition"
          >
            Ouvrir les notifications
          </Link>
        </section>

        <div className="text-center text-gray-600 text-sm">
          <p>Velto — votre copilote pour les décisions Shopify.</p>
        </div>
      </div>
    </VeltoLayout>
  );
}
