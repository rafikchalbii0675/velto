export const cozyWarmPremiumButton = {
  display: "inline-block",
  padding: "14px 24px",
  backgroundColor: "#3a2f28",
  color: "#fff",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  letterSpacing: "0.3px",

  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.10)
  `,

  transform: "translateY(0)",
  transition: "all 0.25s ease",
  cursor: "pointer",
};

export const cozyWarmPremiumButtonHover = {
  transform: "translateY(-2px)",
  boxShadow: `
    0 6px 18px rgba(0, 0, 0, 0.20),
    0 12px 32px rgba(0, 0, 0, 0.12)
  `,
};
