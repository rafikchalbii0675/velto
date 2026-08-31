export function CozyCard({ title, children }) {
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        marginBottom: "24px",
      }}
    >
      {title && (
        <h2 style={{ marginBottom: "12px", fontSize: "20px" }}>{title}</h2>
      )}
      {children}
    </div>
  );
}

export function CozyInfoCard({ label, value }) {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#faf7f3",
        borderRadius: "12px",
        border: "1px solid #e1e3e5",
        marginBottom: "12px",
      }}
    >
      <strong style={{ display: "block", marginBottom: "6px" }}>{label}</strong>
      <span style={{ color: "#4a4a4a" }}>{value}</span>
    </div>
  );
}
