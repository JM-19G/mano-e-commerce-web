import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
  const user = localStorage.getItem("currentUser");
    if (user) {
    navigate("/home");
     }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Login successful");

    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
     >
      <div
        style={{
          width: 320,
          padding: 20,
          background: "white",
          borderRadius: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
       >
       <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
         placeholder="Email"
         onChange={(e) =>
          setForm({ ...form, email: e.target.value })
         }
         style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
         type="password"
         placeholder="Password"
         onChange={(e) =>
          setForm({ ...form, password: e.target.value })
         }
         style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <button
         onClick={handleLogin}
          style={{
            width: "100%",
            padding: 10,
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: 5,
          }}
         >
         Login
        </button>

        <p style={{ textAlign: "center", marginTop: 10 }}>
          No account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;