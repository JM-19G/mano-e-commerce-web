function PageWrapper({ children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.bg} />
      <div style={styles.overlay} />
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.6)",
  },

  content: {
    position: "relative",
    zIndex: 2,
    padding: "20px",
    maxWidth: 1200,
    margin: "0 auto",
  },
};

export default PageWrapper;