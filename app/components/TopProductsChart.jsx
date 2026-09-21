import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TopProductsChart({ topProducts }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!topProducts || topProducts.length === 0) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = topProducts.map((p) => p.productName);
    const values = topProducts.map((p) => p._sum.totalPrice);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Revenus par produit",
            data: values,
            backgroundColor: "rgba(245, 158, 11, 0.6)",
            borderColor: "#f59e0b",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [topProducts]);

  return (
    <div style={{ height: "300px" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
