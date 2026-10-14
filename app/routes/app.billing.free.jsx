import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  await prisma.shop.update({
    where: { shop: session.shop },
    data: {
      plan: "FREE",
      subscriptionId: null,
      status: "ACTIVE"
    }
  });

  return redirect("/app/settings/subscription");
}

export default function FreePage() {
  return null;
}
