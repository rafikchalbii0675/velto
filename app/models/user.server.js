import bcrypt from "bcryptjs";
import prisma from "~/db.server";

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

export async function updatePassword(userId, newPassword) {
  const hashed = await bcrypt.hash(newPassword, 10);

  return prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });
}