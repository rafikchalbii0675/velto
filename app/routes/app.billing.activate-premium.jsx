import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);

  return billing.require({
    plan: "PREMIUM",
    isTest: true,
    returnUrl: "/app?plan=PREMIUM",
  });
};
