import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUser } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { prisma } from "~/db.server";

export async function action({ request }) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const shopId = form.get("shopId");

  // Vérifier si l'email existe déjà
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return json({ error: "Cet email est déjà utilisé." }, { status: 400 });
  }

  // Créer l'utilisateur
  const user = await createUser({ email, password, shopId });

  // Créer la session
  return createUserSession(user.id, "/onboarding");
}

export default function Register() {
  const data = useActionData();

  return (
    <div className="login-page">
      <h1>Créer un compte Velto</h1>

      {data?.error && <p className="error">{data.error}</p>}

      <Form method="post">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Mot de passe" required />
        <input name="shopId" type="text" placeholder="ID Shopify" required />
        <button type="submit">Créer mon compte</button>
      </Form>
    </div>
  );
}
