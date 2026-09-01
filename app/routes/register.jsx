// app/routes/register.jsx

import { json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

// IMPORTANT : alias "~" interdit → chemin relatif obligatoire
import { prisma } from "../db.server";

import { createUser } from "~/models/user.server";
import { createUserSession } from "~/session.server";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json(
      { error: "Tous les champs sont obligatoires." },
      { status: 400 }
    );
  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return json(
      { error: "Un utilisateur avec cet email existe déjà." },
      { status: 400 }
    );
  }

  // Créer l'utilisateur
  const user = await createUser(email, password);

  // Créer la session et rediriger
  return createUserSession({
    request,
    userId: user.id,
    redirectTo: "/app",
  });
}

export default function RegisterRoute() {
  const actionData = useActionData();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Créer un compte</h1>

      {actionData?.error && (
        <p style={{ color: "red" }}>{actionData.error}</p>
      )}

      <Form method="post">
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            required
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Créer mon compte
        </button>
      </Form>
    </div>
  );
}
