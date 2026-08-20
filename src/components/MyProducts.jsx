import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const vendorId = sessionStorage.getItem("vendorId");
      const vendor = JSON.parse(sessionStorage.getItem("vendor"));

      if (!vendorId || !vendor) {
        if (isMounted) {
          alert("Vendor information not found. Please login again.");
          navigate("/vendor-login");
        }
        return;
      }

      try {
        const response = await fetch(
          `https://tirupur-fashion-hub.onrender.com/api/products/vendor/${vendorId}`
        );

        const data = await response.json();

        if (!response.ok) {
          if (isMounted) {
            alert(data.message || "Failed to load products");
          }
          return;
        }

        if (isMounted) {
          setProducts(data);
        }

      } catch (error) {
        console.error("❌ Get products error:", error);
        if (isMounted) {
          alert("Unable to connect to the backend.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

const handleEdit = (product) => {
  navigate("/vendor/add-product", {
    state: { product }
  });
};

  if (loading) {
    return <p>Loading products...</p>;
  }

const handleDelete = async (productId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `https://tirupur-fashion-hub.onrender.com/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete product");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    alert("Product deleted successfully!");

  } catch (error) {
    console.error("❌ Delete product error:", error);
    alert("Unable to connect to the backend.");
  }
};

  return (
    <div className="my-products-container">
      <h2>📦 My Products</h2>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}

              <h3>{product.name}</h3>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>

              <p>
                <strong>Stock:</strong> {product.stock}
              </p>

              <p>
                <strong>Description:</strong> {product.description}
              </p>

              {product.fabric && (
                <p>
                  <strong>Fabric:</strong> {product.fabric}
                </p>
              )}

              {product.fit && (
                <p>
                  <strong>Fit:</strong> {product.fit}
                </p>
              )}

              <button
                className="edit-btn"
                onClick={() => handleEdit(product)}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(product.id)}
              >
                🗑️ Delete
              </button>

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

export default MyProducts;