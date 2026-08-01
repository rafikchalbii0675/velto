import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import VeltoLayout from "../components/velto/VeltoLayout";
import CozyCard from "../components/CozyCard";
import CozyButton from "../components/CozyButton";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const promotions = [
    { id: 1, title: "Promo été", description: "20% sur toute la boutique" },
    { id: 2, title: "Promo VIP", description: "30% pour les membres" },
  ];

  return json({ promotions });
}

export default function Promotions() {
  const { promotions } = useLoaderData();

  return (
    <VeltoLayout>
      <main style={{ padding: "20px" }}>
        <h1>Promotions</h1>

        {promotions.map((promo) => (
          <CozyCard key={promo.id} title={promo.title}>
            <p>{promo.description}</p>
            <CozyButton onClick={() => alert("Modifier promo")}>
              Modifier
            </CozyButton>
          </CozyCard>
        ))}
      </main>
    </VeltoLayout>
  );
}
