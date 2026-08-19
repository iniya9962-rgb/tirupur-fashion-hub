import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";    
function Signup() {
    const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Account created successfully! Please log in.");

    navigate("/login");

  } catch (error) {
    console.error("❌ Signup error:", error);
    alert("Cannot connect to the backend.");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          
        <input
          type="tel"
          placeholder="Phone Number"
          className="auth-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;