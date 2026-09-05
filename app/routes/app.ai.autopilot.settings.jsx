// app/routes/app.ai.autopilot.settings.jsx

import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { requireUserId } from "~/session.server";

// IMPORTANT : alias "~" casse dans Railway  chemin relatif 100% fiable
import { prisma } from "../db.server";

// ◆ Loader : récupère les paramètres Autopilot IA du marchand
export async function loader({ request }) {
  const userId = await requireUserId(request);

  const settings = await prisma.autopilotSettings.findUnique({
    where: { userId },
  });

  return json({ settings });
}

// ◆ Action : met à jour les paramètres Autopilot IA
export async function action({ request }) {
  const userId = await requireUserId(request);
  const form = await request.formData();

  const frequency = form.get("frequency");

  await prisma.autopilotSettings.upsert({
    where: { userId },
    update: { frequency },
    create: { userId, frequency },
  });

  return json({ success: true });
}

// ◆ Page React
export default function AutopilotSettingsPage() {
  const { settings } = useLoaderData();

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Paramètres Autopilot IA
      </h1>

      <Form method="post">
        <label style={{ display: "block", marginBottom: "12px" }}>
          Fréquence d’analyse IA :
        </label>

        <select
          name="frequency"
          defaultValue={settings?.frequency ?? "daily"}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          <option value="hourly">Chaque heure</option>
          <option value="daily">Chaque jour</option>
          <option value="weekly">Chaque semaine</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            background: "#202223",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Sauvegarder
        </button>
      </Form>
    </div>
  );
}
