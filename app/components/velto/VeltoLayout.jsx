// app/components/VeltoLayout.jsx

import VeltoHeader from "./VeltoHeader";
import VeltoFooter from "./VeltoFooter";

export default function VeltoLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f5f2",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <VeltoHeader />

      <div style={{ flex: 1 }}>{children}</div>

      <VeltoFooter />
    </div>
  );
}
