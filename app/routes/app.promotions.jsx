import { useActionData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";

export default function Promotions() {
  const data = useActionData();

  return (
    <VeltoLayout>
      <div
        style={{
          border: "1px solid #b2e8b5",
          padding: "20px",
          borderRadius: "8px",
          background: "#f6fff7",
        }}
      >
        <strong style={{ color: "#2a6f2a" }}>
          {data?.message || "Promotion créée avec succès !"}
        </strong>
      </div>
    </VeltoLayout>
  );
}