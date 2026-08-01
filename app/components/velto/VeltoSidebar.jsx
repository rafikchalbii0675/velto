import { Link } from "@remix-run/react";
import {
  cozySidebarContainer,
  cozySidebarLink,
  cozySidebarLinkHover,
} from "../styles/cozySidebar";

export default function VeltoSidebar() {
  return (
    <aside style={cozySidebarContainer}>
      <Link
        to="/app_index"
        style={cozySidebarLink}
        onMouseEnter={(e) => Object.assign(e.target.style, cozySidebarLinkHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, cozySidebarLink)}
      >
        Tableau de bord
      </Link>

      <Link
        to="/app/alerts"
        style={cozySidebarLink}
        onMouseEnter={(e) => Object.assign(e.target.style, cozySidebarLinkHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, cozySidebarLink)}
      >
        Alertes
      </Link>

      <Link
        to="/app/hot-products"
        style={cozySidebarLink}
        onMouseEnter={(e) => Object.assign(e.target.style, cozySidebarLinkHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, cozySidebarLink)}
      >
        Produits chauds
      </Link>

      <Link
        to="/app/settings"
        style={cozySidebarLink}
        onMouseEnter={(e) => Object.assign(e.target.style, cozySidebarLinkHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, cozySidebarLink)}
      >
        Paramètres
      </Link>

      <Link
        to="/crypto"
        style={cozySidebarLink}
        onMouseEnter={(e) => Object.assign(e.target.style, cozySidebarLinkHover)}
        onMouseLeave={(e) => Object.assign(e.target.style, cozySidebarLink)}
      >
        Crypto
      </Link>
    </aside>
  );
}
