import VeltoLayout from "../components/velto/VeltoLayout";
import { cozyWarmPremiumButton, cozyWarmPremiumButtonHover } 
from "../components/styles/cozyButtons";

export default function PageName() {
  return (
    <VeltoLayout>
      <h1>Nom de la page</h1>
      <p>Contenu simple pour l’instant.</p>
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
