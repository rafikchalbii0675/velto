// VELTO BETA FREE FOR LIFE - Pour martz869
export function isBetaFree(shopOrEmail: string): boolean {
  if (!shopOrEmail) return false;
  const list = (process.env.BETA_FREE_EMAILS || "").toLowerCase().split(",").map(s=>s.trim());
  return list.some(beta => shopOrEmail.toLowerCase().includes(beta));
}

export function getPrice(shop: string, email?: string) {
  if (isBetaFree(shop) || isBetaFree(email || "")) {
    return { price: 0, isFree: true, label: "BETA FREE FOR LIFE" };
  }
  return { price: 4, isFree: false, label: "$4/mo" };
}
