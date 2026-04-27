import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const isActive = (path) => location.pathname === path;

  // ✅ HANDLE RESPONSIVE
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.navbar}>
      {/* LOGO */}
      <div style={styles.logo} onClick={() => navigate("/home")}>
        🌾 AgroMarket
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
            Wishlist ({wishlistItems.length})
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
            👤 {user?.name || "User"}
          </span>
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
    padding: "14px 24px",
    position: "sticky",
    top: 0,
    zIndex: 1000,

    // 🔥 PREMIUM GLASS EFFECT
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",

    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
    cursor: "pointer",
    color: "#2e7d32",
  },

  links: {
    display: "flex",
    gap: 24,
  },

  link: {
    textDecoration: "none",
    color: "#444",
    fontWeight: 500,
    transition: "0.2s",
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
    color: "#333",
    background: "#f3f4f6",
    padding: "6px 12px",
    borderRadius: 20,
  },

  // 📱 MOBILE
  hamburger: {
    fontSize: 24,
    cursor: "pointer",
  },

  mobileMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "100%",
    background: "white",
    flexDirection: "column",
    padding: 20,
    gap: 16,
    borderBottom: "1px solid #eee",
  },
};

export default Navbar;