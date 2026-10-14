import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { runAutopilot } from "~/models/aiAutopilot.server";

export async function loader({ request }) {
  await requireUserId(request);

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  return json({ shopId });
}

export async function action({ request }) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const shopId = form.get("shopId");

  const results = await runAutopilot(shopId);

  return json({ results });
}

export default function AIAutopilot() {
  const { shopId } = useLoaderData();
  const data = useLoaderData();

  return (
    <div className="dashboard-ia">
      <h1>IA Auto‑Pilot</h1>

      <p>L’IA peut optimiser automatiquement votre boutique.</p>

      <Form method="post">
        <input type="hidden" name="shopId" value={shopId} />
        <button type="submit">Lancer Auto‑Pilot IA</button>
      </Form>

      {data?.results && (
        <section className="ai-section">
          <h2>Actions automatiques effectuées</h2>
          {data.results.length === 0 && <p>Aucune action IA nécessaire.</p>}
          {data.results.map((r, i) => (
            <div key={i} className="ai-item">{r}</div>
          ))}
        </section>
      )}
    </div>
  );
}
