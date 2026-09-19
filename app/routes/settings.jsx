// app/routes/settings.jsx

import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";   // ← FIX : import correct
import VeltoLayout from "../components/velto/VeltoLayout";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return json({ error: "No session found" });
  }

  const settings = await prisma.settings.findUnique({
    where: { shop: session.shop },
  });

  return json(settings || {});
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  if (!session) {
    return json({ error: "No session found" });
  }

  const formData = await request.formData();

  await prisma.settings.upsert({
    where: { shop: session.shop },
    update: {
      theme: formData.get("theme"),
      notifications: formData.get("notifications") === "on",
    },
    create: {
      shop: session.shop,
      theme: formData.get("theme"),
      notifications: formData.get("notifications") === "on",
    },
  });

  return json({ ok: true });
};

export default function SettingsPage() {
  const data = useLoaderData();
  const fetcher = useFetcher();

  return (
    <VeltoLayout title="Paramètres Velto">
      {/* Ton UI ici */}
    </VeltoLayout>
  );
}
