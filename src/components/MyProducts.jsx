import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const vendor = JSON.parse(localStorage.getItem("vendor"));

      if (!vendor || !vendor.id) {
        if (isMounted) {
          alert("Vendor information not found. Please login again.");
          navigate("/vendor-login");
        }
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/products/vendor/${vendor.id}`
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
    localStorage.setItem(
      "editProduct",
      JSON.stringify(product)
    );

    navigate("/vendor/add-product");
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

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