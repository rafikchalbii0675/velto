import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return json({ user });
}

export default function Onboarding() {
  const { user } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Bienvenue sur Velto 🎉</h1>

      <p>Votre compte est prêt.</p>
      <p>Shop ID : {user.shopId}</p>

      <a href={`/dashboard.ia?shop=${user.shopId}`} className="button">
        Accéder au Dashboard IA
      </a>
    </div>
  );
}
