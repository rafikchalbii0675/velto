import "./cozyHeader.css";

export const cozyHeaderContainer = {
  background: `linear-gradient(
    90deg,
    #f7f5f2,
    #d8c3a5,
    #3a2f28
  )`,
  padding: "20px 32px",
  borderRadius: "16px",
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.10)
  `,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const cozyHeaderTitle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "700",
  color: "#3a2f28",
};

export const cozyHeaderBadge = {
  backgroundColor: "#4fd1c5",
  padding: "8px 18px",
  borderRadius: "12px",
  color: "#1a202c",
  fontWeight: "700",
  fontSize: "14px",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
};

export const cozyHeaderLink = {
  color: "#ffffff",
  fontWeight: "600",
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "10px",
  transition: "all 0.25s ease",
};

export const cozyHeaderLinkHover = {
  backgroundColor: "#ffffff",
  color: "#3a2f28",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  transform: "translateY(-2px)",
};
