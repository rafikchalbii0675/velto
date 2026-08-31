import db from "../db.server";

export async function createNotification({
  type,
  level = "info",
  title,
  message,
}) {
  return db.notification.create({
    data: { type, level, title, message },
  });
}

export async function getNotifications({ onlyUnread = false } = {}) {
  return db.notification.findMany({
    where: onlyUnread ? { read: false } : {},
    orderBy: { id: "desc" },
    take: 50,
  });
}

export async function markNotificationRead(id) {
  return db.notification.update({
    where: { id },
    data: { read: true },
  });
}
