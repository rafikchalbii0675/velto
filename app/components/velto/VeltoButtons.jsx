export function CozyButton({ children, onClick, color = "#202223" }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "14px 20px",
        background: color,
        color: "#ffffff",
        border: "none",
        borderRadius: "9px",
        fontSize: "17px",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export function CozyPillButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#c49b63",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {children}
    </button>
  );
}
