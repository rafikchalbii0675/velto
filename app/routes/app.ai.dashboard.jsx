import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../utils/db.server";
import { checkIA } from "../utils/checkIA.server";

export async function loader({ request }) {
  const blocked = await checkIA(request);
  if (blocked) return blocked;

  const userId = "merchant";

  const totalLogs = await prisma.iaLog.count({
    where: { userId },
  });

  const logsByModule = await prisma.iaLog.groupBy({
    by: ["module"],
    where: { userId },
    _count: { module: true },
  });

  const recentLogs = await prisma.iaLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return {
    totalLogs,
    logsByModule,
    recentLogs,
  };
}

export default function AiDashboard() {
  const { totalLogs, logsByModule, recentLogs } = useLoaderData();

  return (
    <VeltoLayout title="Dashboard IA – Velto">
      <div className="space-y-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard IA
        </h2>

        <p className="text-gray-600">
          Vue d’ensemble de l’utilisation de vos modules IA.
        </p>

        {/* Stat globale */}
        <div className="p-6 bg-lime-100 border border-lime-300 rounded-xl">
          <h3 className="text-xl font-bold text-lime-900">
            Analyses IA totales : {totalLogs}
          </h3>
          <p className="text-lime-800 mt-2">
            Nombre total d’analyses IA effectuées avec Velto.
          </p>
        </div>

        {/* Utilisation par module */}
        <div className="p-6 bg-gray-100 border border-gray-300 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">
            Utilisation par module IA
          </h3>

          <div className="mt-4 space-y-2">
            {logsByModule.length === 0 && (
              <p className="text-gray-600">
                Aucun module IA utilisé pour le moment.
              </p>
            )}

            {logsByModule.map((m) => (
              <div
                key={m.module}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-2"
              >
                <span className="font-semibold text-gray-800">
                  {m.module}
                </span>
                <span className="text-gray-600">
                  {m._count.module} analyses
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dernières analyses IA */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">
            Dernières analyses IA
          </h3>

          <div className="mt-4 space-y-3">
            {recentLogs.length === 0 && (
              <p className="text-gray-600">
                Aucune analyse IA récente.
              </p>
            )}

            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs">
                    {log.module}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Input :</strong> {log.input}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </VeltoLayout>
  );
}
