import { json } from "@remix-run/node";
import { verifyVeltoToken } from "~/utils/verifyVelto";
import { processCryptoSale } from "~/actions/cryptoPoints.server";

export async function action({ request }) {
  if (!verifyVeltoToken(request)) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const result = await processCryptoSale(body);

  return json(result);
}
