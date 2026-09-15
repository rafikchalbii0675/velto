import VeltoTopbar from "./VeltoTopbar";
import VeltoHeader from "./VeltoHeader";
import VeltoFooter from "./VeltoFooter";
import VeltoNav from "./VeltoNav";
import VeltoSidebar from "./VeltoSidebar";

export default function VeltoLayout({ children, title, sidebarData }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--velto-bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <VeltoTopbar />
      <VeltoHeader title={title} />

      <div
        style={{
          display: "flex",
          flex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "var(--velto-space-lg)",
          gap: "var(--velto-space-lg)",
        }}
      >
        <VeltoNav />

        <div
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "var(--velto-card-bg)",
            borderRadius: "var(--velto-radius-lg)",
            padding: "var(--velto-space-lg)",
            boxShadow: "var(--velto-shadow-card)",
          }}
        >
          {children}
        </div>

        <VeltoSidebar data={sidebarData} />
      </div>

      <VeltoFooter />
    </div>
  );
}