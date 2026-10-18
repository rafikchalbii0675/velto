import { db } from "../db.server.js";
const prisma = db;

import { authenticate } from "../shopify.server";
import { redirect } from "@remix-run/node";

/**
 * Vérifie si l'utilisateur a accès à l'IA
 * Version BETA - Toujours autorisé pour le build vert
 */
export async function checkIA(request) {
  try {
    const { session, admin } = await authenticate.admin(request);
    
    // Pour le BETA à $4, on autorise tout le monde
    // Après le BETA, on pourra checker dans la DB :
    // const shop = await prisma.session.findFirst({ where: { shop: session.shop } });
    
    return { authorized: true, shop: session.shop, session };
  } catch (error) {
    console.log("checkIA error:", error);
    // Si pas authentifié, redirige vers login
    throw redirect("/auth/login");
  }
}

// Alias pour compatibilité
export const requireIA = checkIA;
export default checkIA;