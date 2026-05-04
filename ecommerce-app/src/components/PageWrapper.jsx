function PageWrapper({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",

        backgroundImage: `
linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
url("https://images.unsplash.com/photo-1500382017468-9049fed747ef")
`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ❌ REMOVE BLUR — KEEP ONLY DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.25)", // just dim, no blur
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;