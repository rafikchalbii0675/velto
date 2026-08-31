export default function VeltoLogo({ size = 42 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Icône Velto */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #3a2f28, #c49b63)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontWeight: "900",
          fontSize: size * 0.45,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        V
      </div>

      {/* Texte Velto */}
      <div
        style={{
          fontSize: size * 0.55,
          fontWeight: "800",
          color: "#3a2f28",
          letterSpacing: "1px",
        }}
      >
        Velto
      </div>
    </div>
  );
}
