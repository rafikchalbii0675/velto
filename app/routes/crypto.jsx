import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import VeltoLayout from "../components/velto/VeltoLayout";

// Import PRO après organisation PowerShell
import { getCryptoMarket } from "../utils/crypto/crypto.ai.server";

/* Loader : données crypto IA */
export async function loader() {
  const cryptoData = await getCryptoMarket();

  return json({
    crypto: cryptoData,
  });
}

/* Page Crypto PRO */
export default function CryptoRoute() {
  const { crypto } = useLoaderData();

  return (
    <VeltoLayout title="Crypto & Commerce IA">
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          background: "#f6f6f7",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "680px",
            padding: "48px",
            background: "#ffffff",
            border: "1px solid #e1e3e5",
            borderRadius: "16px",
          }}
        >
          <h1 style={{ margin: "0 0 16px", fontSize: "32px" }}>
            Crypto & Commerce 🪙
          </h1>

          <p style={{ margin: "0 0 24px", fontSize: "18px", color: "#4a4a4a" }}>
            Analyse IA des cryptomonnaies suivies par Velto.  
            Paiements crypto bientôt disponibles.
          </p>

          <div style={{ marginBottom: "24px" }}>
            {crypto.map((c) => (
              <div
                key={c.id}
                style={{
                  padding: "16px",
                  border: "1px solid #dcdcdc",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  background: "#fafafa",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {c.name}
                </h3>

                <p style={{ margin: "0 0 4px", fontSize: "15px" }}>
                  Prix : {c.price}
                </p>

                <p style={{ margin: "0 0 4px", fontSize: "15px" }}>
                  Tendance :{" "}
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background: c.trend.includes("+")
                        ? "#2e7d32"
                        : "#c62828",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    {c.trend}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              padding: "14px 20px",
              background: "#202223",
              color: "#ffffff",
              border: "none",
              borderRadius: "9px",
              fontSize: "17px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Activer les paiements crypto
          </button>
        </section>
      </main>
    </VeltoLayout>
  );
}
