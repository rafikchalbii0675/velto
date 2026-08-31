import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { generateSecurityAlerts } from "../utils/security.alerts.server";
import { FiAlertTriangle } from "react-icons/fi";

export async function loader() {
  const alerts = await generateSecurityAlerts();
  return json({ alerts });
}

export default function SecurityAlerts() {
  const { alerts } = useLoaderData();

  return (
    <div className="p-8 space-y-8">

      {/* Header Premium */}
      <div className="flex items-center gap-3">
        <FiAlertTriangle size={32} className="text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800">Security Alerts</h1>
      </div>

      <p className="text-gray-500 text-lg">
        Alertes automatiques générées par le système de sécurité Velto.
      </p>

      {/* Card Premium */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-6 hover:shadow-xl transition-all duration-300">

        {alerts.length === 0 ? (
          <p className="text-gray-600">Aucune alerte de sécurité pour le moment.</p>
        ) : (
          alerts.map((a, i) => (
            <div
              key={i}
              className="border-b border-gray-100 pb-4 last:border-b-0 flex items-start gap-3"
            >
              <FiAlertTriangle
                size={22}
                className={a.type === "danger" ? "text-red-500" : "text-yellow-500"}
              />

              <p
                className={`text-sm font-medium ${
                  a.type === "danger" ? "text-red-700" : "text-yellow-700"
                }`}
              >
                {a.message}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
