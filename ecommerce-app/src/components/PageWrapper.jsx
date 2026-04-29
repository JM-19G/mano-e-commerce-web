function PageWrapper({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",

        /* 🌄 BACKGROUND IMAGE */
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ✅ DARK GLASS OVERLAY (THIS IS THE MAGIC) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          background: "rgba(0, 0, 0, 0.35)", // 👈 darker, not white
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "30px 20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;