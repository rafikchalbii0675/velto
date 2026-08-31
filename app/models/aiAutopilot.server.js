import { prisma } from "~/db.server";
import { addAlert } from "~/models/alerts.server";
import { addSecurityLog } from "~/models/securityLogs.server";

export async function runAutopilot(shopId) {
  const products = await prisma.product.findMany({ where: { shopId } });
  const crypto = await prisma.cryptoSale.findMany({ where: { shopId } });
  const alerts = [];

  // -----------------------------
  // AUTO‑OPTIMISATION : Prix produits
  // -----------------------------
  for (const p of products) {
    // Produit cher sans ventes → baisse automatique
    if (p.sales === 0 && p.price > 200) {
      const newPrice = p.price * 0.85; // -15%

      await prisma.product.update({
        where: { id: p.id },
        data: { price: newPrice },
      });

      alerts.push(`Prix réduit automatiquement pour ${p.title} → ${newPrice}$`);
      await addAlert({
        shopId,
        type: "autopilot",
        message: `Prix réduit automatiquement pour ${p.title}`,
        severity: "medium",
      });
    }

    // Produit très performant → augmentation automatique
    if (p.sales > 1000) {
      const newPrice = p.price * 1.10; // +10%

      await prisma.product.update({
        where: { id: p.id },
        data: { price: newPrice },
      });

      alerts.push(`Prix augmenté automatiquement pour ${p.title} → ${newPrice}$`);
      await addAlert({
        shopId,
        type: "autopilot",
        message: `Prix augmenté automatiquement pour ${p.title}`,
        severity: "low",
      });
    }
  }

  // -----------------------------
  // AUTO‑SÉCURITÉ : Crypto
  // -----------------------------
  for (const c of crypto) {
    if (c.amount > 10000) {
      await addSecurityLog({
        shopId,
        type: "crypto",
        message: `Auto‑Pilot : Transaction crypto très élevée détectée (${c.amount})`,
        severity: "high",
      });

      alerts.push(`Auto‑Pilot : Transaction crypto élevée détectée (${c.amount})`);
    }
  }

  // -----------------------------
  // AUTO‑ANALYSE : Alertes critiques
  // -----------------------------
  const highAlerts = await prisma.alert.findMany({
    where: { shopId, severity: "high" },
  });

  if (highAlerts.length > 0) {
    alerts.push("Auto‑Pilot : Alertes critiques détectées. Vérification recommandée.");
  }

  return alerts;
}
