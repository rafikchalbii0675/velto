import { useLoaderData, Link } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const shop = await prisma.shop.findUnique({
    where: { shop: session.shop },
    select: { plan: true }
  });

  return { plan: shop?.plan || "FREE" };
}

export default function SubscriptionDashboard() {
  const { plan } = useLoaderData();

  const plans = {
    FREE: {
      title: "Velto Free",
      price: "0$ / mois",
      color: "gray",
      features: [
        "Analyse IA interne",
        "SEO simple",
        "Notifications IA internes"
      ]
    },
    PRO: {
      title: "Velto Pro",
      price: "29 USD / mois",
      color: "amber",
      features: [
        "SEO IA avancé",
        "Campagnes IA TikTok/Meta/Instagram",
        "Booster IA produits",
        "Optimisation IA automatique"
      ]
    },
    PREMIUM: {
      title: "Velto Premium",
      price: "49 USD / mois",
      color: "purple",
      features: [
        "Analyse du marché mondial",
        "Tendances IA avancées",
        "Opportunités dropshipping",
        "Campagnes IA automatiques",
        "Crypto API avancée"
      ]
    }
  };

  const current = plans[plan];

  return (
    <VeltoLayout title="Votre abonnement Velto">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Carte du plan actuel */}
        <div className={`p-6 bg-${current.color}-100 rounded-xl shadow border border-${current.color}-300`}>
          <h2 className={`text-3xl font-bold text-${current.color}-900`}>
            {current.title}
          </h2>

          <p className="mt-2 text-gray-700">
            Prix : <strong>{current.price}</strong>
          </p>

          <p className="mt-4 text-gray-800 font-semibold">
            Fonctionnalités incluses :
          </p>

          <ul className="mt-3 space-y-2 text-gray-700">
            {current.features.map((f, i) => (
              <li key={i}>✔ {f}</li>
            ))}
          </ul>
        </div>

        {/* Bouton pour changer de plan */}
        <div className="p-6 bg-white rounded-xl shadow border border-gray-200 text-center">
          <p className="text-gray-700 mb-4">
            Vous souhaitez changer de plan ?
          </p>

          <Link
            to="/app/billing/page"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Voir les plans Velto
          </Link>
        </div>

      </div>
    </VeltoLayout>
  );
}
