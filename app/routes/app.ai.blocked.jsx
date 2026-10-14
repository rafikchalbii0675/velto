import VeltoLayout from "../components/velto/VeltoLayout";

export default function AiBlocked() {
  return (
    <VeltoLayout title="Accès IA limité">
      <div className="p-6 bg-red-100 border border-red-300 rounded-xl">
        <h2 className="text-xl font-bold text-red-900">
          Accès réservé aux abonnements PRO et PREMIUM
        </h2>
        <p className="mt-2 text-red-800">
          Mettez à niveau votre abonnement pour accéder à l’intelligence artificielle Velto.
        </p>

        <a
          href="/app/billing/pro"
          className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Passer à PRO
        </a>
      </div>
    </VeltoLayout>
  );
}
