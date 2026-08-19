import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

 const handleLogin = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // Store user info in sessionStorage (can be used for UI state)
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("userId", data.user.id);

        alert(`Welcome, ${data.user.name}! You have successfully logged in.`);

        window.location.href = "/";

    } catch (error) {
        console.error("❌ Login error:", error);
        alert("Cannot connect to the backend.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="button"
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;