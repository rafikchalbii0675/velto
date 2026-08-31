export default function LoaderCozy() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "24px 0",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "4px solid #e0d4c8",
          borderTopColor: "#d4b89f",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
