import "@shopify/shopify-api/adapters/node";
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { prisma } from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: "2024-10",
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: {
    storeSession: async (session) => {
      await prisma.session.upsert({
        where: { id: session.id },
        update: { 
          shop: session.shop, 
          state: session.state, 
          isOnline: session.isOnline, 
          scope: session.scope, 
          expires: session.expires, 
          accessToken: session.accessToken, 
          userId: session.userId ? String(session.userId) : null 
        },
        create: { 
          id: session.id, 
          shop: session.shop, 
          state: session.state, 
          isOnline: session.isOnline || false, 
          scope: session.scope || "", 
          expires: session.expires, 
          accessToken: session.accessToken || "", 
          userId: session.userId ? String(session.userId) : null 
        },
      });
      return true;
    },
    loadSession: async (id) => {
      const s = await prisma.session.findUnique({ where: { id } });
      if (!s) return undefined;
      return { ...s, userId: typeof s.userId === "string" ? BigInt(s.userId) : s.userId };
    },
    deleteSession: async (id) => { 
      await prisma.session.delete({ where: { id } }); 
      return true; 
    },
    deleteSessions: async (ids) => { 
      await prisma.session.deleteMany({ where: { id: { in: ids } } }); 
      return true; 
    },
    findSessionsByShop: async (shop) => { 
      const sessions = await prisma.session.findMany({ where: { shop } }); 
      return sessions.map(s => ({ ...s, userId: typeof s.userId === "string" ? BigInt(s.userId) : s.userId })); 
    },
  },
  future: { unstable_newEmbeddedAuthStrategy: true },
});

export default shopify;
export const apiVersion = shopify.apiVersion;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;