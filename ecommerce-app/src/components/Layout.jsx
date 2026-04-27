import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div
      style={{
        /* ❌ REMOVE solid background */
        /* background: "var(--bg)", */

        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* ✅ GLASS CONTAINER */}
      <div
        style={{
          padding: "30px 20px",
          maxWidth: 1200,
          margin: "20px auto",

          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;