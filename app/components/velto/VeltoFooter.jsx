import { cozyWarmPremiumButton, cozyWarmPremiumButtonHover } 
from "../components/styles/cozyButtons";

export default function VeltoFooter() {
  return (
    <footer
      style={{
        padding: "12px",
        backgroundColor: "#3a2f28",
        color: "#fff",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <small>© 2026 Velto — Cozy Warm Edition</small>
    </footer>
  );
}
<Link
  to="/app/alerts"
  style={cozyWarmPremiumButton}
  onMouseEnter={(e) => Object.assign(e.target.style, cozyWarmPremiumButtonHover)}
  onMouseLeave={(e) => Object.assign(e.target.style, cozyWarmPremiumButton)}
>
  Accéder au tableau de bord
</Link>
