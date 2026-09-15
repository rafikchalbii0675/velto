import { Link, useLocation } from "@remix-run/react";

export default function VeltoNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const items = [
    { path: "/app", label: "Dashboard" },
    { path: "/app/products", label: "Produits" },
    { path: "/app/promotions", label: "Promotions" },
    { path: "/app/notifications", label: "Notifications IA" },
    { path: "/app/hot-products", label: "Hot Products" },
    { path: "/app/crypto", label: "Crypto (v2)" },
    { path: "/app/settings", label: "Paramètres" },
    { path: "/app/market-ia", label: "Tendances IA" },
    { path: "/app/campaigns", label: "Campagnes IA" },
    { path: "/app/about", label: "À propos" },
  ];

  return (
    <nav
      style={{
        width: "240px",
        minWidth: "240px",
        flexShrink: 0,
        background: "var(--velto-bg)",
        borderRight: "1px solid var(--velto-border)",
        padding: "var(--velto-space-lg) var(--velto-space-md)",
        position: "sticky",
        top: 0,
        height: "calc(100vh - 120px)",
        overflowY: "auto",
        zIndex: 1,
      }}
    >
      {/* LOGO */}
      <div style={{ marginBottom: "var(--velto-space-xl)", textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "var(--velto-title-lg)",
            fontWeight: 700,
            color: "var(--velto-ocean-dark)",
          }}
        >
          Velto
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "var(--velto-text-secondary)",
          }}
        >
          Cozy Warm • Mode Pro
        </p>
      </div>

      {/* MENU */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.path} style={{ marginBottom: "var(--velto-space-md)" }}>
            <Link
              to={item.path}
              className={isActive(item.path) ? "velto-nav-item-active" : "velto-nav-item"}
              style={{
                display: "block",
                padding: "var(--velto-space-sm)",
                borderRadius: "var(--velto-radius-md)",
                textDecoration: "none",
                fontSize: "var(--velto-title-md)",
                transition: "0.2s",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
