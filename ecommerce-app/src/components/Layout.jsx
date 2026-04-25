function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backdropFilter: "blur(6px)", // 🔥 blur effect
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
};

export default Layout;