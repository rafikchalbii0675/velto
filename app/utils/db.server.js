export * from "../db.server.js";
import * as mod from "../db.server.js";
const db = mod.db || mod.prisma || mod.default;
export const prisma = db;
export { db };
export default db;
