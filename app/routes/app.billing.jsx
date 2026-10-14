// app/routes/app.billing.jsx

import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Création du plan Velto Basic
  const subscription = await admin.billing.subscribe({
    plan: {
      name: "Velto Basic",
      price: 29.0,
      trialDays: 7,
      currencyCode: "USD",
      interval: "EVERY_30_DAYS",
    },
    returnUrl: `${process.env.SHOPIFY_APP_URL}/app.billing.callback`,
  });

  return redirect(subscription.confirmationUrl);
};
