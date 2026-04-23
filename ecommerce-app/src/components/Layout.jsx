import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";

function Layout({ children }) {
  const leafIcon = "\uD83C\uDF3E";
  const { theme, toggleTheme } = useTheme();

  const sunIcon = "\u2600\uFE0F";
  const moonIcon = "\uD83C\uDF19";

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
          background: "#2e7d32",
          color: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>
          {leafIcon} Agro Market
        </h2>

        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to="/wishlist"
            style={{ color: "white", textDecoration: "none" }}
          >
            Wishlist
          </Link>
          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
            Cart
          </Link>
          <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
            Orders
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.12)",
              color: "white",
              borderRadius: 999,
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {theme === "dark" ? sunIcon : moonIcon}
          </button>
        </div>
      </nav>

      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

export default Layout;
