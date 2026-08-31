import { authenticate } from "../shopify.server";
import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";
import { json } from "@remix-run/node";

// Import des utilitaires (version PRO après organisation)
import { createShopifyDiscount } from "../utils/shopify-discounts";
import { generateCozyPromotion } from "../utils/ai/ai.suggestions.server";
import { generateAdvancedPromotion } from "../utils/ai/ai.suggestions.advanced.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const title = formData.get("title");
  const percentage = formData.get("percentage");
  const ai = formData.get("ai");

  let finalTitle = title;
  let finalPercentage = percentage;

  // IA simple Cozy Warm
  if (ai === "simple") {
    const suggestion = await generateCozyPromotion();
    finalTitle = suggestion.title;
    finalPercentage = suggestion.percentage;
  }

  // IA avancée Cozy Warm
  if (ai === "advanced") {
    const suggestion = await generateAdvancedPromotion();
    finalTitle = suggestion.title;
    finalPercentage = suggestion.percentage;
  }

  // Création de la promotion Shopify
  const result = await createShopifyDiscount(admin, {
    title: finalTitle,
    percentage: finalPercentage,
  });

  return json({ success: true, result });
}

export default function Promotions() {
  const actionData = useActionData();
  const [showForm, setShowForm] = useState(false);

  return (
    <VeltoLayout title="Promotions intelligentes">
      <p style={{ fontSize: "16px", color: "#6b5b4d", marginBottom: "24px" }}>
        Gérez vos campagnes chaleureuses, ciblées et efficaces.
      </p>

      {/* Bouton pour ouvrir le formulaire */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          backgroundColor: "#c49b63",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        + Créer une promotion
      </button>

      {/* Formulaire */}
      {showForm && (
        <div
          style={{
            backgroundColor: "#faf7f3",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Form method="post">
            <label style={{ color: "#3a2f28" }}>Titre de la promotion</label>
            <input
              name="title"
              type="text"
              placeholder="Ex: Cozy Warm -20%"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                marginBottom: "16px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <label style={{ color: "#3a2f28" }}>Pourcentage</label>
            <input
              name="percentage"
              type="number"
              placeholder="Ex: 20"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                marginBottom: "16px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <div style={{ marginTop: "20px" }}>
              <label style={{ color: "#3a2f28" }}>
                Utiliser l’IA simple Cozy Warm
              </label>
              <input
                type="radio"
                name="ai"
                value="simple"
                style={{ marginLeft: "10px" }}
              />

              <br />

              <label style={{ color: "#3a2f28" }}>
                Utiliser l’IA avancée Cozy Warm
              </label>
              <input
                type="radio"
                name="ai"
                value="advanced"
                style={{ marginLeft: "10px" }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#8b6b3f",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Créer la promotion
            </button>
          </Form>
        </div>
      )}

      {/* Résultat */}
      {actionData?.success && (
        <div
          style={{
            backgroundColor: "#dfffe0",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "20px",
            border: "1px solid #b2e8b5",
          }}
        >
          <strong style={{ color: "#2a6f2a" }}>
            Promotion créée avec succès !
          </strong>
        </div>
      )}
    </VeltoLayout>
  );
}
