export function buildChartData(history) {
  const labels = history.map((item) => item.date);
  const values = history.map((item) => item.amount);

  return { labels, values };
}
