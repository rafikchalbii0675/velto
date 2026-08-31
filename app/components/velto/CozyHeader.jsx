export default function CozyHeader({ title }) {
  return (
    <header
      style={{
        width: "100%",
        padding: "20px 32px",
        backgroundColor: "#c49b63",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "4px solid #3a2f28",
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
        {title || "Cozy Warm"}
      </h1>

      <div
        style={{
          fontSize: "14px",
          opacity: 0.9,
          fontWeight: "600",
        }}
      >
        Cozy Header
      </div>
    </header>
  );
}
