// app/routes/app.daily.jsx

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";

// IMPORTANT : chemin relatif pour Railway
import { prisma } from "../db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  // On récupère le shop de l'utilisateur
  const shop = await prisma.shop.findUnique({
    where: { ownerId: userId },
    include: {
      logs: true,
      products: true,
      promotions: true,
    },
  });

  if (!shop) {
    return json({
      shopFound: false,
      daily: null,
    });
  }

  // Rapport du jour
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const logsToday = shop.logs.filter(
    (log) => log.createdAt.toISOString().split("T")[0] === todayString
  );

  return json({
    shopFound: true,
    daily: {
      date: todayString,
      name: shop.name,
      points: shop.points,
      productsCount: shop.products.length,
      promotionsCount: shop.promotions.length,
      logsTodayCount: logsToday.length,
    },
  });
}

export default function DailyReport() {
  const { shopFound, daily } = useLoaderData();

  if (!shopFound) {
    return <p>Aucun shop trouvé pour cet utilisateur.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rapport du jour</h1>

      <p><strong>Date :</strong> {daily.date}</p>
      <p><strong>Nom du shop :</strong> {daily.name}</p>
      <p><strong>Points :</strong> {daily.points}</p>
      <p><strong>Produits :</strong> {daily.productsCount}</p>
      <p><strong>Promotions :</strong> {daily.promotionsCount}</p>
      <p><strong>Logs aujourd'hui :</strong> {daily.logsTodayCount}</p>
    </div>
  );
}
