import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) navigate("/home");
  }, [navigate]); // ✅ add this

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) return alert("Invalid credentials");

    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          No account?{" "}
          <span onClick={() => navigate("/register")} style={styles.link}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--bg)",
  },

  card: {
    width: 350,
    padding: 25,
    borderRadius: 12,
    background: "var(--surface)",
    boxShadow: "var(--shadow)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "var(--text-h)",
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface-2)",
    color: "var(--text-h)",
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginTop: 15,
    color: "var(--text)",
  },

  link: {
    color: "#2e7d32",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;