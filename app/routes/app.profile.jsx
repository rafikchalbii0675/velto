import { json } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { prisma } from "~/db.server";

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

  const newShopId = form.get("shopId");

  if (!newShopId || newShopId.length < 3) {
    return json({ error: "Shop ID invalide." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { shopId: newShopId },
  });

  return json({ success: "Shop ID mis à jour avec succès." });
}

export default function Profile() {
  const { user } = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="dashboard-ia">
      <h1>Profil Marchand</h1>

      <section>
        <h2>Informations du compte</h2>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Shop ID actuel :</strong> {user.shopId}</p>
      </section>

      <section>
        <h2>Modifier le Shop ID</h2>

        {actionData?.error && <p className="error">{actionData.error}</p>}
        {actionData?.success && <p className="success">{actionData.success}</p>}

        <Form method="post">
          <input
            type="text"
            name="shopId"
            placeholder="Nouveau Shop ID"
            defaultValue={user.shopId}
            required
          />
          <button type="submit">Mettre à jour</button>
        </Form>
      </section>
    </div>
  );
}
