import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const notifications = await prisma.iANotification.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });

  return json({ notifications });
}

export default function NotificationsIA() {
  const { notifications } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Notifications IA</h1>

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
