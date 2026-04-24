function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        padding: 15,
        background: "#2e7d32",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>AgroMarket</h3>

      {user ? (
        <div>
          <span style={{ marginRight: 10 }}>
            {user.name}
          </span>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <a href="/login">Login</a>{" "}
          <a href="/register">Register</a>
        </div>
      )}
    </div>
  );
}

export default Navbar;