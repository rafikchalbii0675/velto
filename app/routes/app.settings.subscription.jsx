import { useLoaderData, Link } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  // Lecture du plan dans ta DB
  const shop = await prisma.shop.findUnique({
    where: { shop: session.shop },
    select: { plan: true }
  });

  return { plan: shop?.plan || "FREE" };
}

export default function SubscriptionSettings() {
  const { plan } = useLoaderData();

  const planDetails = {
    FREE: {
      title: "Velto Free",
      price: "0$ / mois",
      desc: "Analyse IA interne, SEO simple, notifications IA internes."
    },
    PRO: {
      title: "Velto Pro",
      price: "29 USD / mois",
      desc: "SEO IA avancé, campagnes IA TikTok/Meta/Instagram, booster IA produits."
    },
    PREMIUM: {
      title: "Velto Premium",
      price: "49 USD / mois",
      desc: "Analyse du marché mondial, tendances IA, opportunités dropshipping, campagnes IA automatiques."
    }
  };

  const current = planDetails[plan];

  return (
    <VeltoLayout title="Votre abonnement Velto">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Carte du plan actuel */}
        <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Plan actuel : {current.title}
          </h2>

          <p className="mt-2 text-gray-700">{current.desc}</p>

          <p className="mt-4 text-lg font-semibold text-gray-900">
            Prix : {current.price}
          </p>
        </div>

        {/* Bouton pour changer de plan */}
        <div className="p-6 bg-gray-100 rounded-xl shadow border border-gray-300 text-center">
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
