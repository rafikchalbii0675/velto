export default function Premium() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Velto Leadership Premium</h1>
      <p style={{ marginTop: "10px" }}>
        Débloquez la puissance complète de Velto avec l’IA avancée,
        les boosts automatiques et les récompenses Premium.
      </p>

      <div style={{
        marginTop: "30px",
        background: "#f7f3ef",
        padding: "20px",
        borderRadius: "12px"
      }}>
        <h2>Fonctionnalités Premium</h2>
        <ul>
          <li>Notifications intelligentes avancées</li>
          <li>Boost automatique des produits</li>
          <li>Analyse CTR / conversion / marge</li>
          <li>IA Cozy Warm complète</li>
          <li>Récompenses marchands avancées</li>
          <li>Modules exclusifs (Crypto, Auto‑Pilot, Hot Products IA)</li>
        </ul>
      </div>

      <a
        href="/billing/upgrade"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          background: "#ff9900",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Passer à Velto Premium
      </a>
    </div>
  );
}
