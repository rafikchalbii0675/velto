import { Link } from "@remix-run/react";
import { FiBox, FiTag, FiBell, FiShield } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-10">

      {/* Header Premium */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Bienvenue sur Velto
        </h1>
        <p className="text-gray-500 text-lg">
          Votre espace Cozy Warm Premium
        </p>
      </div>

      {/* Cards Grid Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <DashboardCard
          icon={<FiBox size={32} />}
          title="Produits"
          description="Gérez vos produits avec une interface simple et chaleureuse."
          to="/products"
        />

        <DashboardCard
          icon={<FiTag size={32} />}
          title="Promotions"
          description="Créez et gérez vos promotions facilement."
          to="/promotions"
        />

        <DashboardCard
          icon={<FiBell size={32} />}
          title="Alertes"
          description="Recevez des alertes intelligentes pour votre boutique."
          to="/alerts"
        />

        <DashboardCard
          icon={<FiShield size={32} />}
          title="Crypto"
          description="Vérifiez la sécurité cryptographique de votre application."
          to="/crypto"
        />

      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description, to }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 space-y-4 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      <div className="text-orange-500">
        {icon}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>

      <Link
        to={to}
        className="inline-block px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Ouvrir
      </Link>
    </div>
  );
}
