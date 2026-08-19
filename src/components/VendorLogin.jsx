import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function VendorLogin() { 

  const navigate = useNavigate ();
  
  const [vendorLogin, setVendorLogin] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setVendorLogin({
      ...vendorLogin,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/vendor-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorLogin),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("vendorLoggedIn", "true");
    localStorage.setItem("vendor", JSON.stringify(data.vendor));

    alert("Vendor Login Successful!");

    navigate("/vendor-dashboard");

  } catch (error) {
    console.error("❌ Vendor login error:", error);
    alert("Unable to connect to the backend.");
  }
};


  return (

    <div className="vendor-container">

      <h2>Vendor Login</h2>


      <form onSubmit={handleSubmit}>
        
        <input
          type="email"
          name="email"
          placeholder="Vendor Email"
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        
        <button type="submit">
          Login
        </button>


      </form>

      <p className="auth-link">
         Don&apos;t have a vendor account?{" "}
         <Link to="/vendor-registration">Register here</Link>
      </p>

    </div>

  );

}

export default VendorLogin;