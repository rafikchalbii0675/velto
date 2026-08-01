import VeltoLayout from "../components/velto/VeltoLayout.jsx";
import { cozyWarmPremiumButton, cozyWarmPremiumButtonHover } 
from "../components/styles/cozyButtons";

export default function HotProductsPage() {
  return (
    <VeltoLayout>
      <h1>Hot Products</h1>
      <p>Contenu simple pour l'instant.</p>
    </VeltoLayout>
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
