import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [editProduct] = useState(location.state?.product || null);

  const [product, setProduct] = useState(() => {
    // Check if we're editing (from location.state)
    if (location.state?.product) {
      return location.state.product;
    }

    return {
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: null,

      fabric: "",
      gsm: "",
      sleeveType: "",
      neckType: "",
      fit: "",
      pattern: "",
      sareeLength: "",
      blousePiece: "",
      occasion: "",
      washCare: "",
    };
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        console.log("IMAGE DATA:", reader.result);
      setProduct((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };    
      reader.readAsDataURL(file);
    }    
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const vendorId = sessionStorage.getItem("vendorId");
  const vendor = JSON.parse(sessionStorage.getItem("vendor"));

  if (!vendorId || !vendor) {
    alert("Vendor information not found. Please login again.");
    navigate("/vendor-login");
    return;
  }

  try {
    const productData = {
      vendorId: parseInt(vendorId),
      vendorEmail: vendor.email,
      vendorName: vendor.shopName,

      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,

      fabric: product.fabric,
      gsm: product.gsm,
      sleeveType: product.sleeveType,
      neckType: product.neckType,
      fit: product.fit,
      pattern: product.pattern,
      sareeLength: product.sareeLength,
      blousePiece: product.blousePiece,
      occasion: product.occasion,
      washCare: product.washCare,

      collarType: product.collarType,
      hoodType: product.hoodType,
      pocketType: product.pocketType,
      waistType: product.waistType,
      length: product.length,
      stretchable: product.stretchable,
      ageGroup: product.ageGroup,
      kurtaLength: product.kurtaLength,
      bottomType: product.bottomType,
      dupattaIncluded: product.dupattaIncluded,
      styleType: product.styleType,
      waistRise: product.waistRise,
      trendType: product.trendType,
      brand: product.brand,
      exportGrade: product.exportGrade,
      condition: product.condition,
      moq: product.moq,
    };

    // ================= EDIT PRODUCT =================
    if (editProduct && editProduct.id) {

      const response = await fetch(
        `http://localhost:5000/api/products/${editProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update product");
        return;
      }

      alert("Product updated successfully!");

    } 
    // ================= ADD PRODUCT =================
    else {

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add product");
        return;
      }

      alert("Product added successfully!");
    }

    // Go back to dashboard
    navigate("/vendor-dashboard");

  } catch (error) {
    console.error("❌ Product save error:", error);
    alert("Unable to connect to the backend.");
  }
};

  return (
    <div className="vendor-container">

      <h2> {editProduct ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name || ""}
          onChange={handleChange}
          required
        />
       
        <select
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            required
        >
            <option value="">Select Category</option>
            <option>T-Shirts</option>
            <option>Shirts</option>
            <option>Hoodies</option>
            <option>Leggings</option>
            <option>Kids Wear</option>
            <option>Kurta Set</option>
            <option>Sarees</option>
            <option>Tops</option>
            <option>Korean Style</option>
            <option>Jeans</option>
            <option>Current Trending</option>
            <option>Export Surplus</option>
        </select>

        
{product.category === "T-Shirts" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric (Cotton, Cotton Blend...)"
      value={product.fabric ||""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="gsm"
      placeholder="GSM (e.g. 180 GSM)"
      value={product.gsm || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sleeveType"
      placeholder="Sleeve Type (Half Sleeve, Full Sleeve)"
      value={product.sleeveType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="neckType"
      placeholder="Neck Type (Round Neck, Polo Neck)"
      value={product.neckType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit (Regular Fit, Oversized)"
      value={product.fit ||""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pattern"
      placeholder="Pattern (Printed, Solid)"
      value={product.pattern || ""}
      onChange={handleChange}
      required
    />
  </>
)}
        
{product.category === "Sarees" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric (Premium Organza, Silk, Cotton...)"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sareeLength"
      placeholder="Saree Length (e.g. 5.5 meters)"
      value={product.sareeLength || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="blousePiece"
      placeholder="Blouse Piece (Included / Not Included)"
      value={product.blousePiece || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="occasion"
      placeholder="Occasion (Wedding, Festive, Party)"
      value={product.occasion || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="washCare"
      placeholder="Wash Care (Dry Clean Recommended)"
      value={product.washCare || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit / Draping Style"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Shirts" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sleeveType"
      placeholder="Sleeve Type"
      value={product.sleeveType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="collarType"
      placeholder="Collar Type"
      value={product.collarType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pattern"
      placeholder="Pattern"
      value={product.pattern || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Hoodies" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="gsm"
      placeholder="GSM"
      value={product.gsm || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="hoodType"
      placeholder="Hood Type"
      value={product.hoodType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pocketType"
      placeholder="Pocket Type"
      value={product.pocketType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Leggings" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="waistType"
      placeholder="Waist Type"
      value={product.waistType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="length"
      placeholder="Length"
      value={product.length || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="stretchable"
      placeholder="Stretchable (Yes/No)"
      value={product.stretchable || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Kids Wear" && (
  <>
    <input
      type="text"
      name="ageGroup"
      placeholder="Age Group"
      value={product.ageGroup || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sleeveType"
      placeholder="Sleeve Type"
      value={product.sleeveType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pattern"
      placeholder="Pattern"
      value={product.pattern || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Kurta Set" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="kurtaLength"
      placeholder="Kurta Length"
      value={product.kurtaLength || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="bottomType"
      placeholder="Bottom Type"
      value={product.bottomType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="dupattaIncluded"
      placeholder="Dupatta Included (Yes/No)"
      value={product.dupattaIncluded || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="occasion"
      placeholder="Occasion"
      value={product.occasion || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Korean Style" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="styleType"
      placeholder="Style Type"
      value={product.styleType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pattern"
      placeholder="Pattern"
      value={product.pattern || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="occasion"
      placeholder="Occasion"
      value={product.occasion || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Jeans" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="waistRise"
      placeholder="Waist Rise"
      value={product.waistRise || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="length"
      placeholder="Length"
      value={product.length || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="stretchable"
      placeholder="Stretchable (Yes/No)"
      value={product.stretchable || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Tops" && (
  <>
    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sleeveType"
      placeholder="Sleeve Type"
      value={product.sleeveType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="neckType"
      placeholder="Neck Type"
      value={product.neckType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="occasion"
      placeholder="Occasion"
      value={product.occasion || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Current Trending" && (
  <>
    <input
      type="text"
      name="trendType"
      placeholder="Trend Type"
      value={product.trendType || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit"
      value={product.fit || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pattern"
      placeholder="Pattern"
      value={product.pattern || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="occasion"
      placeholder="Occasion"
      value={product.occasion || ""}
      onChange={handleChange}
      required
    />
  </>
)}

{product.category === "Export Surplus" && (
  <>
    <input
      type="text"
      name="brand"
      placeholder="Brand"
      value={product.brand || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fabric"
      placeholder="Fabric"
      value={product.fabric || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="exportGrade"
      placeholder="Export Grade"
      value={product.exportGrade || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="condition"
      placeholder="Condition (New / Surplus)"
      value={product.condition || ""}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="moq"
      placeholder="MOQ (Minimum Order Quantity)"
      value={product.moq || ""}
      onChange={handleChange}
      required
    />
  </>
)}

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={product.price || ""}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock || ""}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description || ""}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="file"
          accept="image/* "          
          onChange={handleImage}
          required={!editProduct}
        />

        <button type="submit"> {editProduct ? "Update Product" : "Add Product"} </button>
      </form>
    </div>
  );
}

export default AddProduct;