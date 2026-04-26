import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(form);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🌱</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={styles.input}
        />

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

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} style={styles.link}>
            Login
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

export default Register;