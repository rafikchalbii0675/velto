import VeltoLayout from "../components/velto/VeltoLayout";

export default function AiFree() {
  return (
    <VeltoLayout title="Accès IA limité – Velto">
      <div className="space-y-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Accès IA limité
        </h2>

        <p className="text-gray-600">
          Votre abonnement actuel ne permet pas d’utiliser les modules IA.
          Passez à PRO ou PREMIUM pour débloquer la puissance IA.
        </p>

        {/* Carte FREE */}
        <div className="p-8 bg-red-100 border border-red-300 rounded-2xl shadow">
          <h3 className="text-2xl font-bold text-red-900 mb-4">
            Plan FREE
          </h3>

          <p className="text-red-800">
            Vous n’avez pas accès aux modules IA.
          </p>

          <ul className="space-y-2 text-red-800 mt-4">
            <li>✖ IA Produits</li>
            <li>✖ IA SEO</li>
            <li>✖ IA Marché</li>
            <li>✖ IA Tendances</li>
            <li>✖ IA Opportunités Produits</li>
            <li>✖ IA Dropshipping</li>
            <li>✖ IA Publicités</li>
            <li>✖ IA Crypto</li>
          </ul>
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
