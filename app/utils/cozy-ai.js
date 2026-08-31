export async function generateCozyPromotion() {
  const suggestions = [
    { title: "Cozy Warm -15%", percentage: 15 },
    { title: "Promo Douceur -20%", percentage: 20 },
    { title: "Chaleur d'Été -25%", percentage: 25 },
  ];

  return suggestions[Math.floor(Math.random() * suggestions.length)];
}
