export const cozySidebarContainer = {
  width: "260px",
  backgroundColor: "#f7f5f2", // Fond Cozy Warm
  padding: "24px 16px",
  borderRadius: "16px",
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.10)
  `,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export const cozySidebarLink = {
  padding: "12px 16px",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  color: "#3a2f28",
  fontWeight: "600",
  textDecoration: "none",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
  transition: "all 0.25s ease",
};

export const cozySidebarLinkHover = {
  backgroundColor: "#3a2f28",
  color: "#fff",
  transform: "translateY(-2px)",
  boxShadow: `
    0 6px 18px rgba(0, 0, 0, 0.20),
    0 12px 32px rgba(0, 0, 0, 0.12)
  `,
};
