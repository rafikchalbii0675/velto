import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const ownerPoints = await prisma.ownerPoints.findUnique({
    where: { ownerId: userId }
  });

  const ownerRewards = await prisma.ownerReward.findMany({
    where: { ownerId: userId }
  });

  return json({ ownerPoints, ownerRewards });
}

export default function OwnerDashboard() {
  const { ownerPoints, ownerRewards } = useLoaderData();

  return (
    <div className="owner-dashboard">
      <h1>Owner Dashboard — Studio Cozy Founder</h1>

      <section className="owner-box">
        <h2>Niveau : {ownerPoints.level}</h2>
        <p>Points : {ownerPoints.points}</p>
        <p>Progression : {ownerPoints.progress}%</p>
      </section>

      <section className="owner-section">
        <h2>Badges</h2>
        {ownerRewards
          .filter(r => r.type === "badge")
          .map((badge, i) => <p key={i}>• {badge.title}</p>)}
      </section>

      <section className="owner-section">
        <h2>Trophées</h2>
        {ownerRewards
          .filter(r => r.type === "trophy")
          .map((trophy, i) => <p key={i}>🏆 {trophy.title}</p>)}
      </section>

      <section className="owner-section">
        <h2>Privilèges</h2>
        <p>• IA Future Engine</p>
        <p>• IA Personality Engine</p>
        <p>• IA Negotiation Engine</p>
        <p>• IA System Control</p>
        <p>• IA Marketplace Creator</p>
        <p>• IA Partner Manager</p>
        <p>• IA Premium Rewards Manager</p>
      </section>
    </div>
  );
}
