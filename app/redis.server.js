import { Redis } from "ioredis";

let redis;

if (process.env.NODE_ENV === "production") {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });
} else {
  // En dev, on garde une seule connexion
  if (!global.__redis) {
    global.__redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  }
  redis = global.__redis;
}

export { redis };