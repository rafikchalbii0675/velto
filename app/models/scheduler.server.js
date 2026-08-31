import { prisma } from "~/db.server";
import { runAutopilot } from "~/models/aiAutopilot.server";
import { addSecurityLog } from "~/models/securityLogs.server";

export async function runScheduledAutopilot() {
  const shops = await prisma.user.findMany({
    select: { shopId: true },
  });

  const results = [];

  for (const shop of shops) {
    const actions = await runAutopilot(shop.shopId);

    if (actions.length > 0) {
      await addSecurityLog({
        shopId: shop.shopId,
        type: "autopilot",
        message: `Auto‑Pilot programmé : ${actions.length} actions effectuées`,
        severity: "medium",
      });
    }

    results.push({
      shopId: shop.shopId,
      actions,
    });
  }

  return results;
}
