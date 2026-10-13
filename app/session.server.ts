import "@shopify/shopify-api/adapters/node";
import { Session } from "@shopify/shopify-api";
import { prisma } from "./utils/db.server";

export const sessionStorage = {
  async storeSession(session: Session) {
    await prisma.session.upsert({
      where: { id: session.id },
      update: {
        content: JSON.stringify(session),
      },
      create: {
        id: session.id,
        content: JSON.stringify(session),
      },
    });
  },

  async loadSession(id: string) {
    const record = await prisma.session.findUnique({ where: { id } });
    if (!record) return undefined;
    return Session.fromJSON(JSON.parse(record.content as string));
  },

  async deleteSession(id: string) {
    await prisma.session.delete({ where: { id } });
  },
};