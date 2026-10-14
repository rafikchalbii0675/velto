import VeltoLayout from "../components/velto/VeltoLayout";
import { Link } from "@remix-run/react";

export default function BillingPage() {
  return (
    <VeltoLayout title="Plans Velto">
      <div className="space-y-10 max-w-3xl mx-auto">

        {/* Velto Free */}
        <div className="p-6 bg-gray-100 rounded-xl shadow border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800">Velto Free</h2>
          <p className="mt-2 text-gray-700">
            Analyse IA interne, SEO simple, notifications IA internes.
          </p>

          <Link
            to="/app/billing/free"
            className="mt-4 inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
          >
            Activer Velto Free
          </Link>
        </div>

        {/* Velto Pro */}
        <div className="p-6 bg-amber-100 rounded-xl shadow border border-amber-300">
          <h2 className="text-2xl font-bold text-amber-900">Velto Pro — 29 USD / mois</h2>
          <p className="mt-2 text-amber-800">
            SEO IA avancé, campagnes IA TikTok/Meta/Instagram, booster IA produits.
          </p>

          <Link
            to="/app/billing/pro"
            className="mt-4 inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Activer Velto Pro
          </Link>
        </div>

        {/* Velto Premium */}
        <div className="p-6 bg-purple-100 rounded-xl shadow border border-purple-300">
          <h2 className="text-2xl font-bold text-purple-900">Velto Premium — 49 USD / mois</h2>
          <p className="mt-2 text-purple-800">
            Analyse du marché mondial, tendances IA, opportunités dropshipping, campagnes IA automatiques.
          </p>

          <Link
            to="/app/billing/premium"
            className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Activer Velto Premium
          </Link>
        </div>

      </div>
    </VeltoLayout>
  );
}
