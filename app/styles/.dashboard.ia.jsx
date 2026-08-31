import "~/styles/dashboard.css";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDashboardData } from "~/models/dashboard.server";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import {
  formatPointsChart,
  formatCryptoChart,
  formatMonthlyChart,
} from "~/utils/charts";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ------------------------------------------------------------
// LOADER
// ------------------------------------------------------------
export async function loader({ request }) {
  const url = new URL(request.url);
  const shopId = url.searchParams.get("shop");

  const data = await getDashboardData(shopId);

  return json(data);
}

// ------------------------------------------------------------
// PAGE : Dashboard IA
// ------------------------------------------------------------
export default function DashboardIA() {
  const { points, logs, crypto } = useLoaderData();

  const pointsChart = formatPointsChart(points);
  const cryptoChart = formatCryptoChart(crypto);
  const monthlyChart = formatMonthlyChart(points);

  return (
    <div className="dashboard-ia">
      <h1>Velto Intelligence</h1>

      {/* POINTS IA */}
      <section>
        <h2>Points IA</h2>
        <p>Total : {points?.total}</p>
        <p>Mois : {points?.month}</p>
        <p>Niveau : {points?.level}</p>

        <Bar data={pointsChart} />
      </section>

      {/* CRYPTO */}
      <section>
        <h2>Crypto</h2>
        {crypto.length === 0 && <p>Aucune transaction crypto.</p>}
        <Bar data={cryptoChart} />

        {crypto.map((c) => (
          <div key={c.id} className="crypto-item">
            <strong>{c.amount} {c.currency}</strong> — tx: {c.txId}
          </div>
        ))}
      </section>

      {/* MENSUEL */}
      <section>
        <h2>Points Mensuels</h2>
        <Bar data={monthlyChart} />
      </section>

      {/* LOGS IA */}
      <section>
        <h2>Logs IA</h2>
        {logs.length === 0 && <p>Aucun log IA.</p>}
        {logs.map((l) => (
          <div key={l.id} className="log-item">
            <strong>{l.type}</strong> — {l.message}
          </div>
        ))}
      </section>
    </div>
  );
}
