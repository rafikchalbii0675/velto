import { login } from "../shopify.server";

export const loader = async ({ request }: { request: Request }) => {
  const errors = await login(request);
  return errors;
};