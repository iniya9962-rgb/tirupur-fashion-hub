
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const navigate = useNavigate();

  const products =
    JSON.parse(localStorage.getItem("vendorproducts")) || [];

    const handleEdit = (index) => {
  const productToEdit = products[index];

  localStorage.setItem(
    "editProduct",
    JSON.stringify({
      ...productToEdit,
      index:index
    })
  );

  navigate("/vendor/add-product");
};

//Delete product function
const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const updatedProducts = products.filter((_, i) => i !== index);
    localStorage.setItem("vendorproducts", JSON.stringify(updatedProducts));
    window.location.reload(); // Refresh the page to update the UI
  };

  return (
    <div className="my-products-container">
      <h2>📦 My Products</h2>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="products-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Description:</strong> {product.description}</p>

              {product.fabric && (
                <p><strong>Fabric:</strong> {product.fabric}</p>
              )}

              {product.fit && (
                <p><strong>Fit:</strong> {product.fit}</p>
              )}

              {product.image && (
                 <img
                     src={product.image}
                     alt={product.name}
                     className="product-image"
                 />
              )}
              <button
                className="edit-btn"
                onClick={() => handleEdit(index)}
              >
                ✏️Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                🗑️Delete
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
