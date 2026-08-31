export default function VeltoHeader({ title }) {
  return (
    <header
      style={{
        width: "100%",
        padding: "20px 32px",
        backgroundColor: "#3a2f28",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        {title || "Velto Dashboard"}
      </h1>

      <div
        style={{
          fontSize: "14px",
          opacity: 0.9,
        }}
      >
        Cozy Warm Edition
      </div>
    </header>
  );
}
