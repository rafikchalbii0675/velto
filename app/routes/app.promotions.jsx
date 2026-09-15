import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "~/components/velto/VeltoLayout";

export const loader = async ({ context }) => {
  // Récupération des promotions Shopify
  const priceRules = await context.admin.rest.resources.PriceRule.all();
  const discountCodes = await context.admin.rest.resources.DiscountCode.all();

  return {
    priceRules: priceRules.data,
    discountCodes: discountCodes.data,
  };
};

export default function PromotionsPage() {
  const { priceRules, discountCodes } = useLoaderData();

  return (
    <VeltoLayout>
      <div
        className="velto-page-bg"
        style={{
          padding: "var(--velto-space-xl)",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="velto-title-lg" style={{ marginBottom: "var(--velto-space-lg)" }}>
          Promotions Shopify
        </h1>

        <p style={{ color: "var(--velto-text-secondary)", marginBottom: "var(--velto-space-lg)" }}>
          Promotions actives récupérées depuis votre boutique Shopify.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--velto-space-lg)" }}>
          {priceRules.map((rule) => (
            <div key={rule.id} className="velto-card">
              <h3 className="velto-title-md">{rule.title}</h3>

              <p style={{ marginTop: "var(--velto-space-md)" }}>
                Type: {rule.value_type}
              </p>
              <p>Valeur: {rule.value}</p>
              <p>État: {rule.entitled_product_ids?.length > 0 ? "Active" : "Inactive"}</p>

              <div style={{ marginTop: "var(--velto-space-lg)" }}>
                <button className="velto-btn-primary">Voir la promotion</button>
              </div>
            </div>
          ))}

          {discountCodes.length > 0 && (
            <div className="velto-card">
              <h3 className="velto-title-md">Codes de réduction</h3>

              {discountCodes.map((code) => (
                <p key={code.id} style={{ marginTop: "var(--velto-space-sm)" }}>
                  Code: {code.code}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </VeltoLayout>
  );
}
