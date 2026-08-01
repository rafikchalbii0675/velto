import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.__db__) {
  global.__db__ = new PrismaClient();
}

prisma = global.__db__;

export { prisma };
