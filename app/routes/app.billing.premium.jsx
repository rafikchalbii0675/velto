import VeltoLayout from "../components/velto/VeltoLayout";

export default function BillingPremium() {
  return (
    <VeltoLayout title="Abonnement PREMIUM – Velto">
      <div className="space-y-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Abonnement PREMIUM
        </h2>

        <p className="text-gray-600">
          Le plan PREMIUM débloque la puissance IA avancée pour votre boutique.
        </p>

        {/* Carte PREMIUM */}
        <div className="p-8 bg-purple-100 border border-purple-300 rounded-2xl shadow">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            PREMIUM – 49$/mois
          </h3>

          <ul className="space-y-2 text-purple-800">
            <li>✔ Accès complet aux modules IA</li>
            <li>✔ 1000 crédits IA / mois</li>
            <li>✔ IA Publicités PREMIUM</li>
            <li>✔ IA Produits PREMIUM</li>
            <li>✔ IA SEO PREMIUM</li>
            <li>✔ IA Marché PREMIUM</li>
            <li>✔ IA Tendances PREMIUM</li>
            <li>✔ IA Opportunités PREMIUM</li>
            <li>✔ IA Dropshipping PREMIUM</li>
            <li>✔ Analyse IA avancée</li>
            <li>✔ Recommandations IA pour scaling</li>
          </ul>

          <a
            href="/app/billing/activate-premium"
            className="block mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-center"
          >
            Activer PREMIUM
          </a>
        </div>

      </div>
    </VeltoLayout>
  );
}
