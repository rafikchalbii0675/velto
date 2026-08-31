export default function Checkmark() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <svg
        width="90"
        height="90"
        viewBox="0 0 52 52"
        style={{
          stroke: "#d4b89f",
          strokeWidth: 4,
          fill: "none",
          strokeLinecap: "round",
          animation: "scaleIn 0.6s ease forwards",
        }}
      >
        <circle
          cx="26"
          cy="26"
          r="24"
          style={{
            strokeDasharray: 160,
            strokeDashoffset: 160,
            animation: "circleDraw 1s ease forwards",
          }}
        />

        <path
          d="M14 27 L22 35 L38 19"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: 40,
            animation: "checkDraw 0.8s ease 0.6s forwards",
          }}
        />
      </svg>

      <style>
        {`
          @keyframes circleDraw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes checkDraw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0.4);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
