import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const successes = await prisma.iASuccess.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });

  return json({ successes });
}

export default function SuccessIA() {
  const { successes } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>IA Success — Vos Succès & Trophées</h1>

      {successes.map((s) => (
        <div key={s.id} className="success-item">
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <small>{new Date(s.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
