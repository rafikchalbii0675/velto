// app/db.server.js
import { PrismaClient } from "@prisma/client";

// --- Velto PRO: gestion unique de l'instance Prisma ---
// Remix recharge les modules à chaque requête en développement.
// Pour éviter de créer 1000 connexions DB, on stocke Prisma dans globalThis.

let prisma;

if (!globalThis.__velto_prisma__) {
  globalThis.__velto_prisma__ = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Logs PRO pour Velto
  });
}

prisma = globalThis.__velto_prisma__;

// --- Export PRO ---
export default prisma;
