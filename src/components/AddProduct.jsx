import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState(() => {

  const savedProduct = JSON.parse(
    localStorage.getItem("editProduct")
  );

  return savedProduct || {
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

  const vendor = JSON.parse(localStorage.getItem("vendor"));

  if (!vendor || !vendor.id) {
    alert("Vendor information not found. Please login again.");
    navigate("/vendor-login");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId: vendor.id,
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add product");
      return;
    }

    alert("Product added successfully!");

    localStorage.removeItem("editProduct");

    navigate("/vendor-dashboard");

  } catch (error) {
    console.error("❌ Add product error:", error);
    alert("Unable to connect to the backend.");
  }
};

const editProduct = 
  JSON.parse(localStorage.getItem("editProduct")) || null;

  return (
    <div className="vendor-container">

      <h2> {editProduct ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
       
        <select
            name="category"
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
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="gsm"
      placeholder="GSM (e.g. 180 GSM)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sleeveType"
      placeholder="Sleeve Type (Half Sleeve, Full Sleeve)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="neckType"
      placeholder="Neck Type (Round Neck, Polo Neck)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit (Regular Fit, Oversized)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="pattern"
      placeholder="Pattern (Printed, Solid)"
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
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="sareeLength"
      placeholder="Saree Length (e.g. 5.5 meters)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="blousePiece"
      placeholder="Blouse Piece (Included / Not Included)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="occasion"
      placeholder="Occasion (Wedding, Festive, Party)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="washCare"
      placeholder="Wash Care (Dry Clean Recommended)"
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="fit"
      placeholder="Fit / Draping Style"
      onChange={handleChange}
      required
    />
  </>
)}


{product.category === "Shirts" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="sleeveType" placeholder="Sleeve Type" onChange={handleChange} required />
    <input type="text" name="collarType" placeholder="Collar Type" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
    <input type="text" name="pattern" placeholder="Pattern" onChange={handleChange} required />
  </>
)}

{product.category === "Hoodies" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="gsm" placeholder="GSM" onChange={handleChange} required />
    <input type="text" name="hoodType" placeholder="Hood Type" onChange={handleChange} required />
    <input type="text" name="pocketType" placeholder="Pocket Type" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
  </>
)}

{product.category === "Leggings" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="waistType" placeholder="Waist Type" onChange={handleChange} required />
    <input type="text" name="length" placeholder="Length" onChange={handleChange} required />
    <input type="text" name="stretchable" placeholder="Stretchable (Yes/No)" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
  </>
)}

{product.category === "Kids Wear" && (
  <>
    <input type="text" name="ageGroup" placeholder="Age Group" onChange={handleChange} required />
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="sleeveType" placeholder="Sleeve Type" onChange={handleChange} required />
    <input type="text" name="pattern" placeholder="Pattern" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
  </>
)}

{product.category === "Kurta Set" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="kurtaLength" placeholder="Kurta Length" onChange={handleChange} required />
    <input type="text" name="bottomType" placeholder="Bottom Type" onChange={handleChange} required />
    <input type="text" name="dupattaIncluded" placeholder="Dupatta Included (Yes/No)" onChange={handleChange} required />
    <input type="text" name="occasion" placeholder="Occasion" onChange={handleChange} required />
  </>
)}

{product.category === "Korean Style" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="styleType" placeholder="Style Type" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
    <input type="text" name="pattern" placeholder="Pattern" onChange={handleChange} required />
    <input type="text" name="occasion" placeholder="Occasion" onChange={handleChange} required />
  </>
)}

{product.category === "Jeans" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="waistRise" placeholder="Waist Rise" onChange={handleChange} required />
    <input type="text" name="length" placeholder="Length" onChange={handleChange} required />
    <input type="text" name="stretchable" placeholder="Stretchable (Yes/No)" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
  </>
)}

{product.category === "Tops" && (
  <>
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="sleeveType" placeholder="Sleeve Type" onChange={handleChange} required />
    <input type="text" name="neckType" placeholder="Neck Type" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
    <input type="text" name="occasion" placeholder="Occasion" onChange={handleChange} required />
  </>
)}

{product.category === "Current Trending" && (
  <>
    <input type="text" name="trendType" placeholder="Trend Type" onChange={handleChange} required />
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="fit" placeholder="Fit" onChange={handleChange} required />
    <input type="text" name="pattern" placeholder="Pattern" onChange={handleChange} required />
    <input type="text" name="occasion" placeholder="Occasion" onChange={handleChange} required />
  </>
)}

{product.category === "Export Surplus" && (
  <>
    <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
    <input type="text" name="fabric" placeholder="Fabric" onChange={handleChange} required />
    <input type="text" name="exportGrade" placeholder="Export Grade" onChange={handleChange} required />
    <input type="text" name="condition" placeholder="Condition (New / Surplus)" onChange={handleChange} required />
    <input type="text" name="moq" placeholder="MOQ (Minimum Order Quantity)" onChange={handleChange} required />
  </>
)}

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
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