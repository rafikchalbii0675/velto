// app/shopify.server.js

import "@shopify/shopify-app-remix/adapters/node";
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
// ------------------------------------------------------------
// Shopify App Configuration
// ------------------------------------------------------------

export const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  apiVersion: "2024-07",

  scopes: process.env.SCOPES?.split(",") ?? [
    "read_products",
    "write_products",
    "read_orders",
    "write_orders",
    "read_customers",
    "write_customers",
  ],

  appUrl: process.env.SHOPIFY_APP_URL,
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),

  // ------------------------------------------------------------
  // Webhooks
  // ------------------------------------------------------------
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: "http",
      callbackUrl: "/webhooks/app_uninstalled",
    },
  },
});

// ------------------------------------------------------------
// Authentication Helper
// ------------------------------------------------------------

export const authenticate = shopify.authenticate;

// ------------------------------------------------------------
// Loaders / Actions Helpers
// ------------------------------------------------------------

export const unauthenticated = shopify.unauthenticated;
export const session = shopify.session;
export const redirectToAuth = shopify.redirectToAuth;