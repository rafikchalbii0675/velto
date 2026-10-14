import VeltoLayout from "../components/velto/VeltoLayout";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../db.server.js";

export async function loader() {
  const logs = await prisma.iaLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return { logs };
}

export default function AiLogs() {
  const { logs } = useLoaderData();
  return (
    <VeltoLayout title="Historique IA">
      <div className="space-y-6">
        {logs.map(log => (
          <div key={log.id} className="p-4 bg-white border rounded-xl">
            <p><strong>Module :</strong> {log.module}</p>
            <p><strong>Input :</strong> {log.input}</p>
            <p><strong>Output :</strong></p>
            <pre className="whitespace-pre-wrap text-xs">{log.output}</pre>
            <p className="text-sm opacity-70">{String(log.createdAt)}</p>
          </div>
        ))}
      </div>
    </VeltoLayout>
  );
}
