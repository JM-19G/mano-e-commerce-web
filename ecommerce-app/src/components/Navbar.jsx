import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { theme, toggleTheme } = useTheme();

  const cartItems = useSelector((state) => state.cart.items);

  const sun = "☀️";
  const moon = "🌙";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Highlight active page
  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.navbar}>
      {/* LEFT: LOGO */}
      <div style={styles.logo} onClick={() => navigate("/home")}>
        🌾 Agro Market
      </div>

      {/* CENTER: LINKS */}
      <div style={styles.links}>
        <Link to="/home" style={isActive("/home") ? styles.activeLink : styles.link}>
          Home
        </Link>

        <Link to="/wishlist" style={isActive("/wishlist") ? styles.activeLink : styles.link}>
          Wishlist
        </Link>

        <Link to="/cart" style={isActive("/cart") ? styles.activeLink : styles.link}>
          Cart ({cartItems.length}) {/* 🛒 badge */}
        </Link>

        <Link to="/orders" style={isActive("/orders") ? styles.activeLink : styles.link}>
          Orders
        </Link>
      </div>

      {/* RIGHT: THEME + USER + LOGOUT */}
      <div style={styles.right}>
        {/* 🌙 THEME BUTTON */}
        <button onClick={toggleTheme} style={styles.theme}>
          {theme === "dark" ? sun : moon}
        </button>

        {/* USER */}
        <span style={styles.user}>
          {user?.name || "User"}
        </span>

        {/* LOGOUT */}
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    color: "#2e7d32",
  },
  links: {
    display: "flex",
    gap: 20,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
  },
  activeLink: {
    textDecoration: "none",
    color: "#2e7d32",
    fontWeight: "bold",
    borderBottom: "2px solid #2e7d32",
    paddingBottom: 2,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  user: {
    fontWeight: 500,
    color: "#555",
  },
  logout: {
    padding: "6px 12px",
    background: "#c62828",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  theme: {
    border: "none",
    background: "#f1f1f1",
    padding: "6px 10px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 16,
  },
};

export default Navbar;