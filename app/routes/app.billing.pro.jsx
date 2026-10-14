import VeltoLayout from "../components/velto/VeltoLayout";

export default function BillingPro() {
  return (
    <VeltoLayout title="Abonnement PRO – Velto">
      <div className="space-y-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Abonnement PRO
        </h2>

        <p className="text-gray-600">
          Le plan PRO débloque la puissance IA pour votre boutique Shopify.
        </p>

        {/* Carte PRO */}
        <div className="p-8 bg-blue-100 border border-blue-300 rounded-2xl shadow">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            PRO – 19$/mois
          </h3>

          <ul className="space-y-2 text-blue-800">
            <li>✔ Accès complet aux modules IA</li>
            <li>✔ 200 crédits IA / mois</li>
            <li>✔ IA Publicités PRO</li>
            <li>✔ IA Produits PRO</li>
            <li>✔ IA SEO PRO</li>
            <li>✔ IA Marché PRO</li>
            <li>✔ IA Tendances PRO</li>
            <li>✔ IA Opportunités PRO</li>
            <li>✔ IA Dropshipping PRO</li>
          </ul>

          <a
            href="/app/billing/activate-pro"
            className="block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center"
          >
            Activer PRO
          </a>
        </div>

      </div>
    </VeltoLayout>
  );
}
