export function VeltoBadge({ type }) {
  const src = `/assets/badges/${type}.png`;

  return (
    <img
      src={src}
      alt={type}
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
      }}
    />
  );
}
