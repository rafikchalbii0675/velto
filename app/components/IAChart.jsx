import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card } from "@shopify/polaris";
import { buildChartData } from "~/utils/charts/charts";

export default function IAChart({ history }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!history || history.length === 0) return;

    const ctx = chartRef.current.getContext("2d");

    // Détruire l'ancien graphique avant d'en créer un nouveau
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const { labels, values } = buildChartData(history);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Transactions IA",
            data: values,
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59,130,246,0.2)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#374151",
            },
          },
          x: {
            ticks: {
              color: "#374151",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#111827",
            },
          },
        },
      },
    });
  }, [history]);

  return (
    <Card>
      <div style={{ height: "300px", padding: "1rem" }}>
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
}
