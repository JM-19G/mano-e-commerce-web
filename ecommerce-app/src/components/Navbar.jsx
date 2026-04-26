import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { theme, toggleTheme } = useTheme();
  const cartItems = useSelector((state) => state.cart.items);

  const isActive = (path) => location.pathname === path;

  // RESPONSIVE FIX
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 DYNAMIC STYLE (THIS FIXES YOUR ISSUE)
  const dynamicNavbarStyle = {
    ...styles.navbar,
    background:
      theme === "dark"
        ? "rgba(17, 24, 39, 0.85)"
        : "rgba(255, 255, 255, 0.85)",
  };

  return (
    <div style={dynamicNavbarStyle}>
      {/* LEFT LOGO */}
      <div style={styles.logo} onClick={() => navigate("/home")}>
        🌾 Agro Market
      </div>

      {/* HAMBURGER */}
      {isMobile && (
        <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      )}

      {/* LINKS */}
      {(!isMobile || menuOpen) && (
        <div
          style={{
            ...styles.links,
            ...(isMobile ? styles.mobileMenu : {}),
          }}
        >
          <Link
            to="/home"
            style={isActive("/home") ? styles.activeLink : styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            style={isActive("/wishlist") ? styles.activeLink : styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Wishlist
          </Link>

          <Link
            to="/cart"
            style={isActive("/cart") ? styles.activeLink : styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartItems.length})
          </Link>

          <Link
            to="/orders"
            style={isActive("/orders") ? styles.activeLink : styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>
        </div>
      )}

      {/* RIGHT SIDE */}
      {!isMobile && (
        <div style={styles.right}>
          <span style={styles.user}>
             {user?.name || "User"} 👤
          </span>

          {/* <button onClick={toggleTheme} style={styles.themeBtn}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button> */}
        </div>
      )}
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    position: "sticky",
    top: 0,
    zIndex: 1000,

    // ✅ THEME-AWARE GLASS
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)",
    color: "var(--text-h)",
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    color: "var(--text-h)",
  },

  links: {
    display: "flex",
    gap: 20,
  },

  link: {
    textDecoration: "none",
    color: "var(--text)",
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
    gap: 12,
  },

  user: {
    fontWeight: 500,
    color: "var(--text-h)",
  },

  theme: {
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text-h)",
    padding: "6px 10px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  hamburger: {
    display: "none",
    fontSize: 22,
    cursor: "pointer",
  },

  mobileMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "100%",
    background: "var(--surface)",
    flexDirection: "column",
    padding: 20,
    gap: 15,
  },
};

export default Navbar;