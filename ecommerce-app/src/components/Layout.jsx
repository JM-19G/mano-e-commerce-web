import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        background: "#2e7d32",
        color: "white",
      }}>
        <h2>🌾 Agro Market</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/wishlist" style={{ color: "white", textDecoration: "none" }}>❤️ Wishlist</Link>
          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link>
          <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>Orders</Link>
        </div>
      </nav>

      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

export default Layout;