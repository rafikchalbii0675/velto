// app/models/user.server.js

import bcrypt from "bcryptjs";
import { prisma } from "../db.server";   // ← FIX alias "~" + default

export async function createUser({ email, password, shopId }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      shopId,
    },
  });
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function verifyLogin(email, password) {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
