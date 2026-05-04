function PageWrapper({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",

        backgroundImage: `
linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
url("https://images.unsplash.com/photo-1500382017468-9049fed747ef")
`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* BLUR OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* CONTENT */}
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