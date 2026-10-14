import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);

  return billing.require({
    plan: "PRO",
    isTest: true,
    returnUrl: "/app?plan=PRO",
  });
};
