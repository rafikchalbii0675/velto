import crypto from "crypto";

export function generateVeltoToken() {
  return crypto.randomBytes(32).toString("hex");
}
