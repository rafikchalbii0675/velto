import React from "react";

export default function IAOpportunityCard({ title, score, trend, description }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>{title}</h3>

      <div style={{ fontSize: "14px", color: "#4b5563" }}>
        {description || "Analyse IA disponible"}
      </div>

      <div
        style={{
          marginTop: "8px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
        }}
      >
        <span>
          🔥 Tendance :{" "}
          <strong style={{ color: "#2563eb" }}>{trend || "N/A"}</strong>
        </span>

        <span>
          ⚡ Score IA :{" "}
          <strong style={{ color: "#16a34a" }}>{score || "0%"}</strong>
        </span>
      </div>
    </div>
  );
}
