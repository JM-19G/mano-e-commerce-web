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
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.navbar}>
      {/* LOGO */}
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

          {/* ✅ WISHLIST WITH COUNT */}
          <Link
            to="/wishlist"
            style={isActive("/wishlist") ? styles.activeLink : styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Wishlist
            {wishlistItems.length > 0 && (
              <span style={styles.badge}>
                {wishlistItems.length}
              </span>
            )}
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

      {/* RIGHT */}
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
    padding: "14px 20px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #eee",
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
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    position: "relative",
  },

  activeLink: {
    textDecoration: "none",
    color: "#2e7d32",
    fontWeight: "bold",
    borderBottom: "2px solid #2e7d32",
    paddingBottom: 2,
  },

  badge: {
    marginLeft: 6,
    background: "#2e7d32",
    color: "white",
    borderRadius: 10,
    padding: "2px 6px",
    fontSize: 11,
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  user: {
    color: "#333",
    fontWeight: 500,
  },

  hamburger: {
    fontSize: 22,
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
    gap: 15,
  },
};

export default Navbar;