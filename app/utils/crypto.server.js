import crypto from "crypto";

function getKey(secret) {
  if (!secret) {
    throw new Error("Le secret de chiffrement est manquant.");
  }

  return crypto.createHash("sha256").update(secret).digest();
}

export function encrypt(text, secret) {
  if (typeof text !== "string") {
    throw new TypeError("Le texte à chiffrer doit être une chaîne de caractères.");
  }

  const iv = crypto.randomBytes(16);
  const key = getKey(secret);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(data, secret) {
  if (typeof data !== "string" || !data.includes(":")) {
    throw new Error("Les données chiffrées sont invalides.");
  }

  const [ivHex, encrypted] = data.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const key = getKey(secret);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}