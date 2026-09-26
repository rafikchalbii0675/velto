import VeltoLayout from "../components/velto/VeltoLayout";
import { prisma } from "../utils/db.server";

export async function loader() {
  const logs = await prisma.iaLog.findMany({
    orderBy: { createdAt: "desc" }
  });

  return { logs };
}

export default function AiLogs() {
  return (
    <VeltoLayout title="Historique IA">
      <div className="space-y-6">
        {logs.map(log => (
          <div key={log.id} className="p-4 bg-white border rounded-xl">
            <p><strong>Module :</strong> {log.module}</p>
            <p><strong>Input :</strong> {log.input}</p>
            <p><strong>Output :</strong></p>
            <pre className="whitespace-pre-wrap">{log.output}</pre>
            <p className="text-sm opacity-70">{log.createdAt}</p>
          </div>
        ))}
      </div>
    </VeltoLayout>
  );
}
