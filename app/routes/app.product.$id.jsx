import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  getProductTrend,
  getStockStatus,
  getSeoScore,
  getAiSuggestion,
} from "../utils/ai/product-trend-seo.server";

// ---------------- LOADER ----------------

export async function loader({ params, request }) {
  const { admin } = await authenticate.admin(request);

  const productId = params.id;

  const product = await admin.rest.Product.find({ id: productId });

  const inventoryLevels = await admin.rest.InventoryLevel.all({
    inventory_item_ids: product.inventory_item_id,
  });

  const stockLevel = inventoryLevels[0] || null;

  return json({
    product,
    stockLevel,
    seoScore: getSeoScore(product),
    trend: getProductTrend(product),
    stockStatus: getStockStatus(stockLevel),
    suggestion: getAiSuggestion(product, stockLevel),
  });
}

// ---------------- ACTIONS IA ----------------

export async function action({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const { admin } = await authenticate.admin(request);
  const productId = params.id;

  const product = await admin.rest.Product.find({ id: productId });

  // --- Promotion IA ---
  if (intent === "create_promo") {
    const discount = (product.salesCount || 0) < 5 ? 15 : 10;

    await admin.rest.PriceRule.create({
      price_rule: {
        title: `Promo IA ${product.title}`,
        target_type: "line_item",
        target_selection: "entitled",
        allocation_method: "across",
        value_type: "percentage",
        value: `-${discount}`,
        customer_selection: "all",
        starts_at: new Date().toISOString(),
        entitled_product_ids: [product.id],
      },
    });

    return json({ ok: true });
  }

  // --- Ajouter du stock ---
  if (intent === "add_stock") {
    const qty = Number(formData.get("quantity") || 0);

    const inventoryLevels = await admin.rest.InventoryLevel.all({
      inventory_item_ids: product.inventory_item_id,
    });

    const level = inventoryLevels[0];

    if (level) {
      await admin.rest.InventoryLevel.adjust({
        inventory_item_id: product.inventory_item_id,
        location_id: level.location_id,
        available_adjustment: qty,
      });
    }

    return json({ ok: true });
  }

  // --- Archiver produit ---
  if (intent === "archive_product") {
    await admin.rest.Product.update({
      id: productId,
      product: { status: "archived" },
    });

    return json({ ok: true });
  }

  return json({ ok: false });
}

// ---------------- UI ----------------

export default function ProductPage() {
  const { product, stockLevel, seoScore, trend, stockStatus, suggestion } =
    useLoaderData();

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "16px" }}>Velto IA — Produit</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* --- Carte produit IA --- */}
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#f7f3ef",
            border: "1px solid #e0d8d1",
          }}
        >
          <h2>{product.title}</h2>
          <p style={{ color: "#6b5b4b" }}>
            ID Shopify : {product.id} — Statut : {product.status}
          </p>

          <p style={{ marginTop: "12px" }}>
            <strong>Prix :</strong>{" "}
            {product.variants?.[0]?.price || "N/A"} CAD
          </p>

          <p>
            <strong>Stock disponible :</strong>{" "}
            {stockLevel ? stockLevel.available : "N/A"} ({stockStatus})
          </p>

          <p>
            <strong>Tendance IA :</strong> {trend}
          </p>

          <p>
            <strong>Score SEO IA :</strong> {seoScore}/100
          </p>

          <p style={{ marginTop: "16px", color: "#4a3f35" }}>
            <strong>Suggestion IA :</strong> {suggestion}
          </p>
        </div>

        {/* --- Actions IA --- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Promotion IA */}
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              background: "#fff7e6",
              border: "1px solid #f0c674",
            }}
          >
            <h3>Promotion intelligente IA</h3>
            <Form method="post">
              <input type="hidden" name="intent" value="create_promo" />
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#ff9900",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Créer une promotion IA
              </button>
            </Form>
          </div>

          {/* Stock IA */}
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              background: "#e6f7ff",
              border: "1px solid #74b9ff",
            }}
          >
            <h3>Gestion de stock IA</h3>
            <Form method="post" style={{ display: "flex", gap: "8px" }}>
              <input type="hidden" name="intent" value="add_stock" />
              <input
                type="number"
                name="quantity"
                placeholder="Quantité à ajouter"
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#0984e3",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Ajouter du stock
              </button>
            </Form>
          </div>

          {/* Archive IA */}
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              background: "#ffe6e6",
              border: "1px solid #ff7675",
            }}
          >
            <h3>Produit non courant</h3>
            <Form method="post">
              <input type="hidden" name="intent" value="archive_product" />
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#d63031",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Archiver le produit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}