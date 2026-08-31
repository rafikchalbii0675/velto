import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const ownerPoints = await prisma.ownerPoints.findUnique({
    where: { ownerId: userId }
  });

  const modules = await prisma.module.findMany();
  const merchants = await prisma.merchant.findMany();
  const partners = await prisma.partner.findMany();

  return json({ ownerPoints, modules, merchants, partners });
}

export default function OwnerControlPanel() {
  const { ownerPoints, modules, merchants, partners } = useLoaderData();

  return (
    <div className="owner-control">
      <h1>Owner Control Panel — Studio Cozy Founder</h1>

      <section className="owner-box">
        <h2>Niveau : {ownerPoints.level}</h2>
        <p>Points : {ownerPoints.points}</p>
        <p>Progression : {ownerPoints.progress}%</p>
      </section>

      <section className="owner-section">
        <h2>Modules IA</h2>
        {modules.map((m, i) => <p key={i}>• {m.name}</p>)}
      </section>

      <section className="owner-section">
        <h2>Marchands</h2>
        {merchants.map((m, i) => <p key={i}>• {m.shopName}</p>)}
      </section>

      <section className="owner-section">
        <h2>Partenaires IA</h2>
        {partners.map((p, i) => <p key={i}>• {p.name}</p>)}
      </section>
    </div>
  );
}
