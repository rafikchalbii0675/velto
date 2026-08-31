export function generateMarketingText({
  title,
  discount,
  productName,
}) {
  const intro = `Découvrez ${productName} — l’un des favoris Cozy Warm.`;
  const offer = `Profitez maintenant de ${discount}% de réduction sur ${title}.`;
  const vibe = `Une promotion pensée pour créer une ambiance chaleureuse, douce et élégante.`;
  const call = `Ne manquez pas cette opportunité Cozy Warm.`;

  return `${intro}\n${offer}\n${vibe}\n${call}`;
}
