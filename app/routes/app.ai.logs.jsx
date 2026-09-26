import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../utils/db.server";

export async function loader() {
  const logs = await prisma.iaLog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return { logs };
}

export default function AiLogs() {
  const { logs } = useLoaderData();

  return (
    <VeltoLayout title="Historique IA – Velto">
      <div className="space-y-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Historique des analyses IA
        </h2>

        <p className="text-gray-600">
          Toutes vos analyses IA, classées du plus récent au plus ancien.
        </p>

        {/* Liste des logs */}
        <div className="space-y-4">
          {logs.length === 0 && (
            <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-xl">
              <p className="text-yellow-800 font-semibold">
                Aucun log IA pour le moment.
              </p>
            </div>
          )}

          {logs.map((log) => (
            <div
              key={log.id}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm">
                  {log.module}
                </span>

                <span className="text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-700">
                <strong>Input :</strong> {log.input}
              </p>

              <div className="mt-3">
                <strong className="text-gray-800">Output IA :</strong>
                <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded-lg mt-2 text-gray-700">
                  {log.output}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VeltoLayout>
  );
}
