import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { getCoachingAdvice, getActionPlan } from "~/models/iaCoaching.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const pointsData = await prisma.iAPoints.findUnique({ where: { shopId } });

  const advice = getCoachingAdvice(pointsData.level);
  const plan = getActionPlan(pointsData.level);

  return json({ pointsData, advice, plan });
}

export default function CoachingIA() {
  const { pointsData, advice, plan } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Coaching IA — Votre Coach Intelligent</h1>

      <section className="coach-box">
        <h2>Niveau : {pointsData.level.toUpperCase()}</h2>
        <p>Points IA : {pointsData.points}</p>
        <p>Progression : {pointsData.progress}%</p>
      </section>

      <section className="coach-section">
        <h2>Conseils IA</h2>
        {advice.map((a, i) => (
          <p key={i}>• {a}</p>
        ))}
      </section>

      <section className="coach-section">
        <h2>Plan d’action IA (7 jours)</h2>
        {plan.map((p, i) => (
          <p key={i}>• {p}</p>
        ))}
      </section>
    </div>
  );
}
