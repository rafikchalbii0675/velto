import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const settings = await prisma.autopilotSettings.findUnique({
    where: { userId },
  });

  return json({ settings });
}

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

export default function AutopilotSettings() {
  const { settings } = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>Configuration Auto‑Pilot IA</h1>

      <Form method="post">
        <label>Fréquence d’exécution</label>
        <select name="frequency" defaultValue={settings?.frequency || "daily"}>
          <option value="daily">Quotidien</option>
          <option value="hourly">Toutes les heures</option>
          <option value="weekly">Hebdomadaire</option>
        </select>

        <button type="submit">Enregistrer</button>
      </Form>
    </div>
  );
}
