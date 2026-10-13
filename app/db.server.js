import { PrismaClient } from "@prisma/client";
let prisma;
if (!global.__prisma__) {
  global.__prisma__ = new PrismaClient();
}
prisma = global.__prisma__;
export { prisma };
export const db = prisma;
export default prisma;
