import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const notifications = await prisma.iANotification.findMany({
    where: { shopId: session.shop },
    orderBy: { createdAt: "desc" },
  });

  return json({ notifications });
}

export default function NotificationsIA() {
  const { notifications } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Notifications IA</h1>

      {notifications.length === 0 && <p>Aucune notification pour le moment.</p>}

      {notifications.map((n) => (
        <div key={n.id} className="notif-item">
          <h3>{n.title}</h3>
          <p>{n.message}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}