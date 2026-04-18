import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <nav style={styles.nav}>
        <h2>🌾 Agro Market</h2>

        <div>
          <Link to="/">Home</Link> |{" "}
          <Link to="/cart">Cart</Link> |{" "}
          <Link to="/orders">Orders</Link>
        </div>
      </nav>

      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    background: "#2e7d32",
    color: "white",
  },
};

export default Layout;