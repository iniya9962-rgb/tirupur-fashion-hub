
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorRegistration() {
  const navigate = useNavigate();

  const [vendor, setVendor] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    categories: [],
  });

  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setVendor({
        ...vendor,
        categories: [...vendor.categories, value],
      });
    } else {
      setVendor({
        ...vendor,
        categories: vendor.categories.filter((item) => item !== value),
      });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (vendor.categories.length === 0) {
    alert("Please select at least one product category.");
    return;
  }

  if (vendor.password !== vendor.confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  try {
    const response = await fetch(
      "https://tirupur-fashion-hub.onrender.com/api/vendor-register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopName: vendor.shopName,
          ownerName: vendor.ownerName,
          email: vendor.email,
          phone: vendor.phone,
          address: vendor.address,
          password: vendor.password,
          categories: vendor.categories,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Vendor Registration Successful!");

    navigate("/vendor-login");

  } catch (error) {
    console.error("❌ Vendor registration error:", error);
    alert("Cannot connect to the backend.");
  }
};

  return (
    <div className="vendor-container">
      <h2>Vendor Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Location with Pincode"
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <div className="category-box">
          <h4>Select Product Categories</h4>

          <label><input type="checkbox" value="T-Shirts" onChange={handleCategoryChange} /> <span>T-Shirts</span></label>
          <label><input type="checkbox" value="Shirts" onChange={handleCategoryChange} /> <span>Shirts</span></label>
          <label><input type="checkbox" value="Hoodies" onChange={handleCategoryChange} /> <span>Hoodies</span></label>
          <label><input type="checkbox" value="Leggings" onChange={handleCategoryChange} /> <span>Leggings</span></label>
          <label><input type="checkbox" value="Kids Wear" onChange={handleCategoryChange} /> <span>Kids Wear</span></label>
          <label><input type="checkbox" value="Kurta Set" onChange={handleCategoryChange} /> <span>Kurta Set</span></label>
          <label><input type="checkbox" value="Sarees" onChange={handleCategoryChange} /> <span>Sarees</span></label>
          <label><input type="checkbox" value="Tops" onChange={handleCategoryChange} /> <span>Tops</span></label>
          <label><input type="checkbox" value="Korean Style" onChange={handleCategoryChange} /> <span>Korean Style</span></label>
          <label><input type="checkbox" value="Jeans" onChange={handleCategoryChange} /> <span>Jeans</span></label>
          <label><input type="checkbox" value="Current Trending" onChange={handleCategoryChange} /> <span>Current Trending</span></label>
          <label><input type="checkbox" value="Export Surplus" onChange={handleCategoryChange} /> <span>Export Surplus</span></label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default VendorRegistration;
