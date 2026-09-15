export default function VeltoSidebar({ data, shop }) {
  const latestNotification = data?.latestNotification;
  const latestAction = data?.latestAction;

  return (
    <div
      style={{
        width: "260px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* INFOS BOUTIQUE */}
      {shop && (
        <div>
          <h3 style={{ marginBottom: "12px" }}>Boutique</h3>
          <p><strong>Nom :</strong> {shop.name || "—"}</p>
          <p><strong>Domaine :</strong> {shop.myshopify_domain || "—"}</p>
          <p><strong>Email :</strong> {shop.email || "—"}</p>
        </div>
      )}

      {/* MODULE IA */}
      <div style={{ backgroundColor: "#f7f0e8", borderRadius: "12px", padding: "16px" }}>
        <strong>Module IA</strong>
        <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
          {latestNotification ? latestNotification.message : "Aucune notification récente."}
        </p>
      </div>

      {/* CRYPTO — V2 */}
      <div style={{ backgroundColor: "#f7f0e8", borderRadius: "12px", padding: "16px", opacity: 0.55 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <strong>Crypto</strong>
          <span style={{
            fontSize: "11px", fontWeight: "700", color: "#a85a3f",
            border: "1px solid #a85a3f", borderRadius: "999px", padding: "2px 8px",
          }}>
            Bientôt — V2
          </span>
        </div>
        <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
          Marché, tendances, paiements crypto.
        </p>
      </div>

      {/* HISTORIQUE */}
      <div style={{ backgroundColor: "#f7f0e8", borderRadius: "12px", padding: "16px" }}>
        <strong>Historique</strong>
        <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
          {latestAction ? `${latestAction.title} (${latestAction.type})` : "Aucune action récente."}
        </p>
      </div>
    </div>
  );
}