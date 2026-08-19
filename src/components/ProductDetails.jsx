import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  // Get vendor products from localStorage
  const vendorProducts =
    JSON.parse(localStorage.getItem("vendorproducts")) || [];

  // Combine fake products + vendor products
  const allProducts = [...products, ...vendorProducts];

  // Find product by id
  const product = allProducts.find(
    (p) => String(p.id) === id
  );

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
        className="details-image"
      />

      <div className="details-info">
        <h1>{product.name}</h1>

        <p className="price">₹{product.price}</p>

        {product.oldPrice && (
          <p className="old-price">₹{product.oldPrice}</p>
        )}

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          {product.description ||
            "Premium export-surplus garment from Tirupur manufacturers. High-quality fabric, durable stitching, and modern styling."}
        </p>

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button
          className="buy-now-btn"
          onClick={() => {
            addToCart(product);
            window.location.href = "/cart";
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;