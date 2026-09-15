import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import VeltoLayout from "../components/velto/VeltoLayout";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const settings = await prisma.shopSettings.upsert({
    where: { shopId: session.shop },
    update: {},
    create: { shopId: session.shop },
  });

  return json({ settings });
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const field = formData.get("field");
  const rawValue = formData.get("value");

  const value =
    field === "hotProductThreshold" ? Number(rawValue) : rawValue === "true";

  const settings = await prisma.shopSettings.upsert({
    where: { shopId: session.shop },
    update: { [field]: value },
    create: { shopId: session.shop, [field]: value },
  });

  return json({ settings });
}

export default function Settings() {
  const { settings } = useLoaderData();
  const fetcher = useFetcher();

  // On utilise les données les plus fraîches (optimiste pendant l'envoi)
  const current = fetcher.formData
    ? {
        ...settings,
        [fetcher.formData.get("field")]:
          fetcher.formData.get("field") === "hotProductThreshold"
            ? Number(fetcher.formData.get("value"))
            : fetcher.formData.get("value") === "true",
      }
    : settings;

  function toggle(field, currentValue) {
    fetcher.submit(
      { field, value: String(!currentValue) },
      { method: "post" }
    );
  }

  function updateThreshold(value) {
    fetcher.submit(
      { field: "hotProductThreshold", value: String(value) },
      { method: "post" }
    );
  }

  return (
    <VeltoLayout title="Paramètres Velto">
      <div style={pageContainer}>

        <div style={introCard}>
          <h2 style={sectionTitle}>Configuration générale</h2>
          <p style={sectionText}>
            Ajustez les paramètres de Velto selon vos préférences. Ces
            réglages influencent les notifications, la fidélité et les
            actions automatiques de Velto BOSS IA.
          </p>
        </div>

        {/* NOTIFICATIONS */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Notifications intelligentes</h3>
          <div style={settingRow}>
            <span style={settingLabel}>Activer les notifications</span>
            <input
              type="checkbox"
              checked={current.notificationsEnabled}
              onChange={() =>
                toggle("notificationsEnabled", current.notificationsEnabled)
              }
              style={checkboxStyle}
            />
          </div>
          <p style={settingDescription}>
            Recevez des alertes sur les produits chauds, les ruptures
            imminentes et les promotions sous-performantes.
          </p>
        </div>

        {/* SEUILS IA */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Seuils de détection IA</h3>
          <div style={settingRow}>
            <span style={settingLabel}>
              Sensibilité "produit chaud" : {current.hotProductThreshold}%
              de hausse
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={current.hotProductThreshold}
            onChange={(e) => updateThreshold(e.target.value)}
            style={{ width: "100%" }}
          />
          <p style={settingDescription}>
            Plus le seuil est bas, plus Velto vous alertera tôt — mais avec
            plus de faux positifs.
          </p>
        </div>

        {/* FIDÉLITÉ */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Points & récompenses</h3>
          <div style={settingRow}>
            <span style={settingLabel}>
              Activer le programme de fidélité
            </span>
            <input
              type="checkbox"
              checked={current.loyaltyEnabled}
              onChange={() =>
                toggle("loyaltyEnabled", current.loyaltyEnabled)
              }
              style={checkboxStyle}
            />
          </div>
          <p style={settingDescription}>
            Programme de fidélité piloté par IA avec paliers et récompenses
            Cozy Warm.
          </p>
        </div>

        {/* PROMOTIONS AUTOMATIQUES */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Actions automatiques (BOSS IA)</h3>
          <div style={settingRow}>
            <span style={settingLabel}>
              Autoriser les promotions automatiques
            </span>
            <input
              type="checkbox"
              checked={current.autoPromoEnabled}
              onChange={() =>
                toggle("autoPromoEnabled", current.autoPromoEnabled)
              }
              style={checkboxStyle}
            />
          </div>
          <p style={settingDescription}>
            Velto créera automatiquement des promotions ciblées selon vos
            ventes, sans besoin de validation manuelle.
          </p>
        </div>

        {/* CRYPTO — GRISÉ V2 */}
        <div style={{ ...cardPremium, opacity: 0.55 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3 style={sectionTitle}>Crypto-commerce</h3>
            <span style={badgeV2}>Bientôt disponible — V2</span>
          </div>
          <div style={settingRow}>
            <span style={settingLabel}>Activer le module crypto</span>
            <input type="checkbox" disabled style={checkboxStyle} />
          </div>
          <p style={settingDescription}>
            Paiements crypto, wallets et cashback Web3 — prévus pour la
            version 2 de Velto.
          </p>
        </div>

        {/* ABONNEMENT */}
        <div style={cardPremium}>
          <h3 style={sectionTitle}>Abonnement</h3>
          <p style={settingDescription}>
            Plan actuel : <strong>Gratuit</strong>
          </p>
          <p style={settingDescription}>
            Passez à Velto Premium pour débloquer les actions automatiques,
            les notifications illimitées et l'accès prioritaire aux
            modules V2.
          </p>
          <button style={upgradeButton}>Passer à Premium</button>
        </div>

      </div>
    </VeltoLayout>
  );
}

const pageContainer = {
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "35px",
};

const introCard = {
  backgroundColor: "#faf6f0",
  borderRadius: "14px",
  padding: "30px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
};

const cardPremium = {
  backgroundColor: "#f7f2ec",
  borderRadius: "14px",
  padding: "25px",
  border: "1px solid #c7a45a",
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
};

const sectionTitle = {
  fontSize: "24px",
  color: "#3a2f28",
  marginBottom: "15px",
  fontWeight: "700",
};

const sectionText = {
  fontSize: "17px",
  color: "#3a2f28",
  lineHeight: "1.6",
};

const settingRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

const settingLabel = {
  fontSize: "17px",
  color: "#3a2f28",
};

const settingDescription = {
  fontSize: "15px",
  color: "#3a2f28",
  lineHeight: "1.6",
  marginTop: "10px",
};

const checkboxStyle = {
  width: "22px",
  height: "22px",
  cursor: "pointer",
};

const badgeV2 = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#a85a3f",
  border: "1px solid #a85a3f",
  borderRadius: "999px",
  padding: "3px 10px",
};

const upgradeButton = {
  marginTop: "10px",
  padding: "12px 24px",
  backgroundColor: "#c7a45a",
  color: "#1a1204",
  fontWeight: "700",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};