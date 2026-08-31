import { FiBox } from "react-icons/fi";

export default function Products() {
  return (
    <div className="p-8 space-y-8">

      {/* Header */}
      <div className="flex items-center gap-3">
        <FiBox size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800">Produits</h1>
      </div>

      <p className="text-gray-500 text-lg">
        Gérez vos produits avec une interface Cozy Warm Premium.
      </p>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-3 hover:shadow-xl transition-all duration-300">
        <p className="text-gray-600">Aucun produit pour le moment.</p>
      </div>
    </div>
  );
}
