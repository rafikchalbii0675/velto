
import { json } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import { updatePassword } from "~/models/user.server";
import { generateVeltoToken } from "../utils/regenerateToken.js";

export async function loader({ request }) {
  const userId = await requireUserId(request);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return json({ user });
}

export async function action({ request }) {
  const userId = await requireUserId(request);
  const form = await request.formData();

  const intent = form.get("intent");

  // ------------------------------------------------------------
  // CHANGEMENT MOT DE PASSE
  // ------------------------------------------------------------
  if (intent === "password") {
    const current = form.get("currentPassword");
    const newPass = form.get("newPassword");

    const user = await prisma.user.findUnique({ where: { id: userId } });

    const valid = await bcrypt.compare(current, user.password);
    if (!valid) {
      return json({ error: "Mot de passe actuel incorrect." }, { status: 400 });
    }

    await updatePassword(userId, newPass);

    return json({ success: "Mot de passe mis à jour avec succès." });
  }

  // ------------------------------------------------------------
  // REGENERATION TOKEN VELTO
  // ------------------------------------------------------------
  if (intent === "token") {
    const newToken = generateVeltoToken();

    await prisma.user.update({
      where: { id: userId },
      data: { veltoToken: newToken },
    });

    return json({ success: "Nouveau token généré.", token: newToken });
  }

  return json({ error: "Action inconnue." }, { status: 400 });
}

export default function Security() {
  const { user } = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="dashboard-ia">
      <h1>Sécurité du compte</h1>

      {/* MESSAGES */}
      {actionData?.error && <p className="error">{actionData.error}</p>}
      {actionData?.success && <p className="success">{actionData.success}</p>}
      {actionData?.token && (
        <p className="success">
          Nouveau token : <strong>{actionData.token}</strong>
        </p>
      )}

      {/* MOT DE PASSE */}
      <section>
        <h2>Changer le mot de passe</h2>

        <Form method="post">
          <input type="hidden" name="intent" value="password" />

          <input
            type="password"
            name="currentPassword"
            placeholder="Mot de passe actuel"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            required
          />

          <button type="submit">Mettre à jour</button>
        </Form>
      </section>

      {/* TOKEN VELTO */}
      <section>
        <h2>Token Velto</h2>
        <p><strong>Token actuel :</strong> {user.veltoToken || "Aucun token"}</p>

        <Form method="post">
          <input type="hidden" name="intent" value="token" />
          <button type="submit">Regénérer le token</button>
        </Form>
      </section>
    </div>
  );
}
