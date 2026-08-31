import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { getDailyGreeting, getDailyPriorities, getDailyMotivation } from "~/models/iaDaily.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const pointsData = await prisma.iAPoints.findUnique({ where: { shopId } });

  const greeting = getDailyGreeting("Studio Cozy");
  const priorities = getDailyPriorities(pointsData.level);
  const motivation = getDailyMotivation(pointsData.level);

  return json({ greeting, priorities, motivation, pointsData });
}

export default function DailyAssistant() {
  const { greeting, priorities, motivation, pointsData } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Assistant du Jour</h1>

      <section className="daily-box">
        <h2>{greeting}</h2>
        <p>Niveau : {pointsData.level.toUpperCase()}</p>
        <p>Progression : {pointsData.progress}%</p>
      </section>

      <section className="daily-section">
        <h2>Priorités du jour</h2>
        {priorities.map((p, i) => (
          <p key={i}>• {p}</p>
        ))}
      </section>

      <section className="daily-section">
        <h2>Motivation du jour</h2>
        <p>{motivation}</p>
      </section>
    </div>
  );
}
