export function predictSales7Days({
  ctr,
  conversion,
  discount,
  marginRate,
}) {
  // Base Shopify
  const baseTraffic = 120; // visites / jour
  const baseOrders = baseTraffic * (conversion / 100);

  // Impact du discount
  const discountBoost =
    discount >= 40 ? 1.8 :
    discount >= 30 ? 1.5 :
    discount >= 20 ? 1.2 : 1.0;

  // Prévision ventes
  const predictedOrders = baseOrders * discountBoost;

  // Prévision revenus
  const predictedRevenue = predictedOrders * (marginRate / 10);

  // Prévision 7 jours
  const days = Array.from({ length: 7 }).map((_, i) => ({
    day: `Jour ${i + 1}`,
    orders: Number((predictedOrders * (1 + i * 0.03)).toFixed(2)),
    revenue: Number((predictedRevenue * (1 + i * 0.03)).toFixed(2)),
  }));

  return {
    baseTraffic,
    baseOrders: Number(baseOrders.toFixed(2)),
    predictedOrders: Number(predictedOrders.toFixed(2)),
    predictedRevenue: Number(predictedRevenue.toFixed(2)),
    days,
  };
}