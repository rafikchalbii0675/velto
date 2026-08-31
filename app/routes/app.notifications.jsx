import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNotifications, markNotificationRead } from "../utils/notifications.server";
import { FiBell, FiCheckCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";

export async function loader() {
  const notifications = await getNotifications();
  return json({ notifications });
}

export async function action({ request }) {
  const form = await request.formData();
  const id = Number(form.get("id"));

  if (id) {
    await markNotificationRead(id);
  }

  return json({ ok: true });
}

export default function NotificationsCenter() {
  const { notifications } = useLoaderData();

  const getIcon = (level) => {
    switch (level) {
      case "danger":
        return <FiAlertTriangle className="text-red-500" size={22} />;
      case "warning":
        return <FiAlertTriangle className="text-yellow-500" size={22} />;
      default:
        return <FiInfo className="text-blue-500" size={22} />;
    }
  };

  return (
    <div className="p-8 space-y-8">

      {/* Header Premium */}
      <div className="flex items-center gap-3">
        <FiBell size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800">Notifications Center</h1>
      </div>

      <p className="text-gray-500 text-lg">
        Toutes vos notifications intelligentes générées par Velto.
      </p>

      {/* Card Premium */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-6 hover:shadow-xl transition-all duration-300">

        {notifications.length === 0 ? (
          <p className="text-gray-600">Aucune notification pour le moment.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="border-b border-gray-100 pb-4 last:border-b-0 flex items-start gap-4"
            >
              {/* Icon */}
              {getIcon(n.level)}

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                <p className="text-xs text-gray-600">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Mark as read */}
              {!n.read && (
                <form method="post">
                  <input type="hidden" name="id" value={n.id} />
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    <FiCheckCircle size={14} className="inline-block mr-1" />
                    Lu
                  </button>
                </form>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}
