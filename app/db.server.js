// app/db.server.js

import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma instances in development or serverless environments
let prisma;

if (!global.__prisma__) {
  global.__prisma__ = new PrismaClient();
}

prisma = global.__prisma__;

export { prisma };
