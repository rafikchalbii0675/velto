export default function ProgressBar({ step }) {
  const steps = 3;
  const percentage = (step / steps) * 100;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#eee",
        borderRadius: "8px",
        height: "10px",
        marginBottom: "24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: "#d4b89f",
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}
