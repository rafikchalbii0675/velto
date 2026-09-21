import VeltoLayout from "../components/velto/VeltoLayout";
import { Link } from "@remix-run/react";

export default function BillingPage() {
  return (
    <VeltoLayout title="Activer Velto Basic">
      <div className="space-y-8 max-w-2xl mx-auto">

        {/* Header Premium */}
        <div className="p-6 bg-gradient-to-r from-amber-200 to-amber-300 rounded-xl shadow-lg border border-amber-400">
          <h1 className="text-3xl font-bold text-amber-900">Velto Basic</h1>
          <p className="text-lg text-amber-800 mt-2">
            Accédez à toute la puissance de Velto pour votre boutique Shopify.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Abonnement</h2>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-gray-900">29$</span>
            <span className="text-lg text-gray-600">/ mois</span>
          </div>

          <p className="mt-2 text-gray-700">
            Essai gratuit : <strong>7 jours</strong>
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✔ Dashboard complet</li>
            <li>✔ Analyse AI intelligente</li>
            <li>✔ Notifications marchands</li>
            <li>✔ Sécurité & monitoring</li>
            <li>✔ Support prioritaire</li>
          </ul>

          <Link
            to="/app.billing"
            className="mt-6 block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg shadow-md transition"
          >
            Activer Velto Basic
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>Velto — Optimisez votre boutique Shopify avec intelligence.</p>
        </div>
      </div>
    </VeltoLayout>
  );
}
