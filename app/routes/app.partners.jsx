import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { getPartnerOffersForLevel, negotiatePartnerOffer } from "~/models/iaPartners.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const pointsData = await prisma.iAPoints.findUnique({ where: { shopId } });

  const offers = await getPartnerOffersForLevel(pointsData.level);
  const negotiated = await negotiatePartnerOffer(pointsData.level, pointsData.points);

  return json({ offers, negotiated, pointsData });
}

export default function PartnersIA() {
  const { offers, negotiated, pointsData } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Partenaires IA & Récompenses Premium</h1>

      <section className="points-box">
        <h2>Niveau : {pointsData.level.toUpperCase()}</h2>
        <p>{pointsData.points} points</p>
        <p>Progression : {pointsData.progress}%</p>
      </section>

      <section className="offers-box">
        <h2>Offres partenaires disponibles</h2>
        {offers.map((o) => (
          <div key={o.id} className="offer-item">
            <strong>{o.title}</strong>
            <p>{o.description}</p>
            <p>Partenaire : {o.partner.name}</p>
          </div>
        ))}
      </section>

      {negotiated && (
        <section className="negotiated-box">
          <h2>Récompense IA Premium négociée</h2>
          <div className="offer-item premium">
            <strong>{negotiated.title}</strong>
            <p>{negotiated.description}</p>
          </div>
        </section>
      )}
    </div>
  );
}
