import VeltoLayout from "~/components/velto/VeltoLayout";

export const loader = async () => {
  return {};
};

export default function SettingsPage() {
  return (
    <VeltoLayout>
      <div
        className="velto-page-bg"
        style={{
          padding: "var(--velto-space-xl)",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          className="velto-title-lg"
          style={{ marginBottom: "var(--velto-space-lg)" }}
        >
          ⚙️ Paramètres Velto
        </h1>

        <p
          style={{
            color: "var(--velto-text-secondary)",
            marginBottom: "var(--velto-space-lg)",
          }}
        >
          Configurez les options de votre application Velto Cozy Warm Edition.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--velto-space-lg)",
          }}
        >
          <div className="velto-card">
            <h3 className="velto-title-md">Apparence</h3>
            <p style={{ marginTop: "var(--velto-space-md)" }}>
              Choisissez le thème Cozy Warm, les couleurs, les espacements et
              l’ambiance générale.
            </p>
            <button className="velto-btn-primary" style={{ marginTop: 20 }}>
              Modifier l’apparence →
            </button>
          </div>

          <div className="velto-card">
            <h3 className="velto-title-md">Notifications IA</h3>
            <p style={{ marginTop: "var(--velto-space-md)" }}>
              Activez ou désactivez les alertes intelligentes générées par Velto.
            </p>
            <button className="velto-btn-primary" style={{ marginTop: 20 }}>
              Gérer les notifications →
            </button>
          </div>

          <div className="velto-card">
            <h3 className="velto-title-md">Crypto-commerce</h3>
            <p style={{ marginTop: "var(--velto-space-md)" }}>
              Paramètres de la version V2 (bientôt disponible).
            </p>
            <button className="velto-btn-primary" style={{ marginTop: 20 }}>
              Voir les options →
            </button>
          </div>
        </div>
      </div>
    </VeltoLayout>
  );
}
