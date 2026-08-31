import VeltoTopbar from "./VeltoTopbar";
import VeltoLogo from "./VeltoLogo";
import VeltoHeader from "./VeltoHeader";
import VeltoFooter from "./VeltoFooter";
import VeltoNav from "./VeltoNav";
import VeltoSidebar from "./VeltoSidebar";

export default function VeltoLayout({ children, title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fdf8f3",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOPBAR */}
      <VeltoTopbar />

      {/* HEADER */}
      <VeltoHeader title={title} />

      {/* MAIN CONTENT */}
      <div
        style={{
          display: "flex",
          flex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "24px",
          gap: "24px",
        }}
      >
        {/* LEFT SIDE: LOGO + NAV */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "220px",
          }}
        >
          <VeltoLogo size={42} />
          <VeltoNav />
        </div>

        {/* PAGE CONTENT */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          {children}
        </div>

        {/* ADVANCED SIDEBAR */}
        <VeltoSidebar />
      </div>

      {/* FOOTER */}
      <VeltoFooter />
    </div>
  );
}