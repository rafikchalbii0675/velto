import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSecurityEvents } from "../utils/audit.server";
import { verifySignature, checkKeys, getWarnings, getSecurityLevel } from "../utils/crypto.server";
import { FiShield, FiKey, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

export async function loader() {
  const signature = verifySignature();
  const keys = checkKeys();
  const warnings = getWarnings();
  const level = getSecurityLevel({ signature, keys, warnings });
  const events = getSecurityEvents();

  return json({ signature, keys, warnings, level, events });
}

export default function SecurityDashboard() {
  const { signature, keys, warnings, level, events } = useLoaderData();

  const levelLabel =
    level === "green" ? "Sécurité élevée" :
    level === "orange" ? "Sécurité moyenne" :
    "Sécurité faible";

  const levelColor =
    level === "green" ? "text-green-500" :
    level === "orange" ? "text-yellow-500" :
    "text-red-500";

  return (
    <div className="p-8 space-y-10">

      {/* Header */}
      <div className="flex items-center gap-3">
        <FiShield size={36} className="text-orange-500" />
        <h1 className="text-4xl font-bold text-gray-800">Security Dashboard PRO</h1>
      </div>

      {/* Indicateur global */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex items-center gap-3">
        <FiShield size={28} className={levelColor} />
        <span className={`text-xl font-semibold ${levelColor}`}>{levelLabel}</span>
      </div>

      {/* Grid Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Signature */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-3">
          <div className="flex items-center gap-2">
            <FiCheckCircle size={26} className={signature.valid ? "text-green-500" : "text-red-500"} />
            <h2 className="text-xl font-semibold text-gray-800">Signature HMAC</h2>
          </div>
          <p className="text-gray-600">{signature.message}</p>
        </div>

        {/* Clés */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-3">
          <div className="flex items-center gap-2">
            <FiKey size={26} className="text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-800">Clés Shopify</h2>
          </div>
          <p className="text-gray-600">
            {keys.allGood ? "Toutes les clés sont présentes." : "Certaines clés sont manquantes."}
          </p>
        </div>

        {/* Warnings */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-3">
          <div className="flex items-center gap-2">
            <FiAlertTriangle size={26} className="text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-800">Avertissements</h2>
          </div>

          {warnings.length === 0 ? (
            <p className="text-gray-600">Aucun avertissement.</p>
          ) : (
            warnings.map((w, i) => (
              <p key={i} className="text-gray-600">{w}</p>
            ))
          )}
        </div>

        {/* Audit Log résumé */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Derniers événements</h2>

          {events.length === 0 ? (
            <p className="text-gray-600">Aucun événement récent.</p>
          ) : (
            events.slice(0, 5).map((e, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-b-0">
                <p className="text-xs text-gray-400">{e.timestamp}</p>
                <p className="text-sm font-semibold text-gray-800">{e.event}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
