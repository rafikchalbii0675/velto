import { Link } from "@remix-run/react";
import {
  cozyHeaderContainer,
  cozyHeaderTitle,
  cozyHeaderBadge,
  cozyHeaderLink,
  cozyHeaderLinkHover,
} from "../styles/cozyHeader";

export default function VeltoHeader() {
  return (
    <header style={cozyHeaderContainer}>
      {/* Identité Velto */}
      <h1 style={cozyHeaderTitle}>Velto — Cozy Commerce</h1>

      {/* Navigation + Badge */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/app_index"
          style={cozyHeaderLink}
          onMouseEnter={(e) => Object.assign(e.target.style, cozyHeaderLinkHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, cozyHeaderLink)}
        >
          Dashboard
        </Link>

        <Link
          to="/app/settings"
          style={cozyHeaderLink}
          onMouseEnter={(e) => Object.assign(e.target.style, cozyHeaderLinkHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, cozyHeaderLink)}
        >
          Paramètres
        </Link>

        <Link
          to="/crypto"
          style={cozyHeaderLink}
          onMouseEnter={(e) => Object.assign(e.target.style, cozyHeaderLinkHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, cozyHeaderLink)}
        >
          Crypto
        </Link>

        <div style={cozyHeaderBadge}>Adventure Mode</div>
      </div>
    </header>
  );
}
