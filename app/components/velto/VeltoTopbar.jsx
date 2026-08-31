export default function VeltoTopbar() {
  return (
    <div
      style={{
        width: "100%",
        padding: "14px 28px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e1e3e5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo / Branding */}
      <div
        style={{
          fontWeight: "800",
          fontSize: "20px",
          color: "#3a2f28",
          letterSpacing: "0.5px",
        }}
      >
        VELTO PRO
      </div>

      {/* Status */}
      <div
        style={{
          opacity: 0.75,
          fontSize: "14px",
          fontWeight: "600",
          color: "#4a4a4a",
        }}
      >
        Mode professionnel activé
      </div>
    </div>
  );
}
