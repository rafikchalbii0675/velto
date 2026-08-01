export default function CozyButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        backgroundColor: "#3a2f28",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
