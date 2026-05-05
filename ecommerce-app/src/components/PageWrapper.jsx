function PageWrapper({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",

        backgroundImage: `
         
         url("https://static.vecteezy.com/system/resources/previews/031/696/054/non_2x/sprawling-agricultural-farm-featuring-fields-of-crops-ai-generated-photo.jpg")
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