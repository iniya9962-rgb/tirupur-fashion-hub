import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("vendorproducts")) || []
  );

  const updateStock = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].stock = value;

    setProducts(updatedProducts);
    localStorage.setItem(
      "vendorproducts",
      JSON.stringify(updatedProducts)
    );
  };

  return (
    <div className="inventory-container">
      <h2>📊 Inventory Management</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="inventory-grid">
          {products.map((product, index) => (
            <div className="inventory-card" key={index}>
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>

              <label>Stock:</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => updateStock(index, e.target.value)}
              />

              <p
                style={{
                  color:
                    Number(product.stock) > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {Number(product.stock) > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        className="back-btn"
        onClick={() => navigate("/vendor-dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Inventory;