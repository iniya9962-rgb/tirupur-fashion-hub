import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        
        if (response.ok) {
          setVendorProducts(data);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Combine fake products + vendor products
  const allProducts = [...products, ...vendorProducts];

  // Find product by id
  const product = allProducts.find(
    (p) => String(p.id) === id
  );

  if (loading) {
    return <h2>Loading product...</h2>;
  }

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