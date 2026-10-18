import { PrismaClient } from "@prisma/client";

if (!global.__prisma__) {
  global.__prisma__ = new PrismaClient();
}

export const prisma = global.__prisma__;
export const db = prisma;
export default prisma;