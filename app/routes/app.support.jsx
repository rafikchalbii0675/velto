import VeltoLayout from "../components/velto/VeltoLayout";

export default function SupportPage() {
  return (
    <VeltoLayout title="Support Velto">
      <div className="space-y-8 max-w-3xl mx-auto">

        {/* Support */}
        <section className="p-6 bg-white rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Support</h2>
          <p className="text-gray-700 mb-4">
            Notre équipe est disponible pour vous aider avec Velto.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>📧 Email support : <strong>support@studiocozy.ca</strong></li>
            <li>🛠️ Assistance technique : <strong>dev@studiocozy.ca</strong></li>
            <li>⏱️ Réponse moyenne : 24h</li>
          </ul>
        </section>

        {/* Privacy */}
        <section className="p-6 bg-white rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Politique de confidentialité</h2>

          <p className="text-gray-700 mb-4">
            Velto respecte la confidentialité des données des marchands et des clients.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>✔ Nous ne vendons jamais vos données.</li>
            <li>✔ Les données sont utilisées uniquement pour les fonctionnalités Velto.</li>
            <li>✔ Vous pouvez demander la suppression de vos données à tout moment.</li>
            <li>✔ Les données sont stockées de manière sécurisée sur nos serveurs.</li>
          </ul>

          <p className="text-gray-700 mt-4">
            Les données collectées incluent : produits, commandes, clients, promotions, inventaire.
          </p>
        </section>

        {/* Terms */}
        <section className="p-6 bg-white rounded-xl shadow border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Conditions d’utilisation</h2>

          <p className="text-gray-700 mb-4">
            En utilisant Velto, vous acceptez les présentes conditions d’utilisation.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>✔ Velto fournit des recommandations AI basées sur vos données Shopify.</li>
            <li>✔ Les décisions commerciales finales vous appartiennent entièrement.</li>
            <li>✔ Velto ne garantit pas une augmentation des ventes.</li>
            <li>✔ Vous devez disposer d’un abonnement actif pour utiliser Velto.</li>
            <li>✔ Velto peut être mis à jour sans préavis.</li>
          </ul>
        </section>

        <div className="text-center text-gray-600 text-sm">
          <p>Velto — Studio Cozy © 2026</p>
        </div>
      </div>
    </VeltoLayout>
  );
}
