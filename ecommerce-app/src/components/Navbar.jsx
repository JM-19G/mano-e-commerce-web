import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const profileRef = useRef();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const isActive = (path) => location.pathname === path;

  // RESPONSIVE
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  

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
          <Link to="/home" style={isActive("/home") ? styles.activeLink : styles.link}>Home</Link>
          <Link to="/wishlist" style={isActive("/wishlist") ? styles.activeLink : styles.link}>
            Wishlist ({wishlistItems.length})
          </Link>
          <Link to="/cart" style={isActive("/cart") ? styles.activeLink : styles.link}>
            Cart ({cartItems.length})
          </Link>
          <Link to="/orders" style={isActive("/orders") ? styles.activeLink : styles.link}>
            Orders
          </Link>
        </div>
      )}

      {/* PROFILE */}
      {!isMobile && (
        <div style={styles.profileWrapper} ref={profileRef}>
          <div
            style={styles.profile}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            👤 {user?.name || "User"} ⌄
          </div>

          {profileOpen && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem} onClick={() => navigate("/orders")}>
                My Orders
              </div>
              <div style={styles.dropdownItem} onClick={() => navigate("/wishlist")}>
                Wishlist
              </div>
              <div style={styles.divider}></div>
              <div style={styles.logout} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
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
  },

  activeLink: {
    textDecoration: "none",
    color: "#2e7d32",
    fontWeight: "bold",
    borderBottom: "2px solid #2e7d32",
  },

  profileWrapper: {
    position: "relative",
  },

  profile: {
    cursor: "pointer",
    background: "#f3f4f6",
    padding: "6px 12px",
    borderRadius: 20,
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: 45,
    background: "rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    minWidth: 150,
    overflow: "hidden",
  },

  dropdownItem: {
    padding: 12,
    cursor: "pointer",
  },

  divider: {
    height: 1,
    background: "#eee",
  },

  logout: {
    padding: 12,
    color: "#c62828",
    cursor: "pointer",
    fontWeight: "bold",
  },

  hamburger: {
    fontSize: 24,
    cursor: "pointer",
  },

  mobileMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "100%",
    background: "rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(255,255,255,0.2)",
    flexDirection: "column",
    padding: 20,
    gap: 16,
  },
};

export default Navbar;