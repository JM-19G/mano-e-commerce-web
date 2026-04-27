import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {/*  NAVBAR STAYS ON TOP */}
      <Navbar />

      {/*  MAIN CONTENT (NO GAP FROM TOP) */}
      <div
        style={{
          padding: "20px",
          maxWidth: 1200,
          margin: "0 auto", // ❌ remove top margin

          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",

          borderRadius: "0 0 16px 16px", // 👈 smooth bottom only
          border: "1px solid rgba(255,255,255,0.4)",
          borderTop: "none", // 👈 connect to navbar
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;