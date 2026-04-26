import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        transition: "0.3s ease",
      }}
    >
      <Navbar />

      <div
        style={{
          padding: "30px 20px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;