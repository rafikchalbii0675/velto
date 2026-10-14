import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSecurityEvents } from "../utils/audit.server";
import { FiShield } from "react-icons/fi";

export async function loader() {
  const events = getSecurityEvents();
  return json({ events });
}

export default function SecurityAudit() {
  const { events } = useLoaderData();

  return (
    <div className="p-8 space-y-8">

      {/* Header Premium */}
      <div className="flex items-center gap-3">
        <FiShield size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800">Audit de sécurité</h1>
      </div>

      <p className="text-gray-500 text-lg">
        Historique complet des événements de sécurité Velto.
      </p>

      {/* Card Premium */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-6 hover:shadow-xl transition-all duration-300">

        {events.length === 0 ? (
          <p className="text-gray-600">Aucun événement de sécurité pour le moment.</p>
        ) : (
          events.map((e, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
              <p className="text-xs text-gray-400">{e.timestamp}</p>
              <p className="text-sm font-semibold text-gray-800">{e.event}</p>
              <p className="text-xs text-gray-600">
                {JSON.stringify(e.details)}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
