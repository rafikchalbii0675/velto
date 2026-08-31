import { login } from "~/shopify.server";

export async function loader({ request }) {
  return await login(request);
}

export async function action({ request }) {
  return await login(request);
}

export default function AuthLogin() {
  return null;
}