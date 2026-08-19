import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const vendorId = sessionStorage.getItem("vendorId");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!vendorId) {
        alert("Vendor information not found. Please login again.");
        navigate("/vendor-login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/products/vendor/${vendorId}`
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        } else {
          alert(data.message || "Failed to load products");
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        alert("Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [vendorId, navigate]);

  const updateStock = async (productId, value) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            stock: value,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update stock");
        return;
      }

      // Update local state
      setProducts(products.map(p =>
        p.id === productId ? { ...p, stock: value } : p
      ));

      alert("Stock updated successfully!");
    } catch (error) {
      console.error("❌ Error updating stock:", error);
      alert("Unable to update stock.");
    }
  };

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div className="inventory-container">
      <h2>📊 Inventory Management</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="inventory-grid">
          {products.map((product) => (
            <div className="inventory-card" key={product.id}>
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>

              <label>Stock:</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => updateStock(product.id, e.target.value)}
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