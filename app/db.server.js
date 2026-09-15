import { createRequestHandler } from "@remix-run/express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { shopifyApp } from "@shopify/shopify-app-express";
import { shopifyAuth } from "@shopify/shopify-app-express/auth";
import { shopifyWebhook } from "@shopify/shopify-app-express/webhooks";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Shopify App Initialization
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  apiVersion: "2026-07",
  scopes: [
    "read_products",
    "write_products",
    "read_orders",
    "write_orders",
    "read_discounts",
    "write_discounts",
  ],
  hostName: process.env.SHOPIFY_APP_URL.replace("https://", ""),
  hostScheme: "https",
});

// Authentication Route
app.get("/api/auth", shopifyAuth);

// Webhooks
app.post("/webhooks", shopifyWebhook);

// Static files (for Remix build)
app.use(express.static(path.join(__dirname, "public")));

// Remix request handler
app.all(
  "*",
  createRequestHandler({
    build: await import("./build/server/index.js"),
    mode: process.env.NODE_ENV,
  })
);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Velto server running on port ${PORT}`);
});
