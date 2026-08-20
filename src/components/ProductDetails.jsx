import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products";

function ProductDetails({ addToCart, buyNow }) {
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

  const allProducts = [...products, ...vendorProducts];

  const product = allProducts.find(
    (p) => String(p.id) === String(id)
  );

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">

      {/* Product Image */}
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

        {/* Description */}
        <p>
          <strong>Description:</strong>{" "}
          {product.description ||
            "Premium export-surplus garment from Tirupur manufacturers. High-quality fabric, durable stitching, and modern styling."}
        </p>

        {/* Product Details */}
        <div className="product-info">

          {product.fabric && (
            <p>
              <strong>Fabric:</strong> {product.fabric}
            </p>
          )}

          {product.gsm && (
            <p>
              <strong>GSM:</strong> {product.gsm}
            </p>
          )}

          {product.sleeve_type && (
            <p>
              <strong>Sleeve Type:</strong> {product.sleeve_type}
            </p>
          )}

          {product.neck_type && (
            <p>
              <strong>Neck Type:</strong> {product.neck_type}
            </p>
          )}

          {product.fit && (
            <p>
              <strong>Fit:</strong> {product.fit}
            </p>
          )}

          {product.pattern && (
            <p>
              <strong>Pattern:</strong> {product.pattern}
            </p>
          )}

          {product.saree_length && (
            <p>
              <strong>Saree Length:</strong> {product.saree_length}
            </p>
          )}

          {product.blouse_piece && (
            <p>
              <strong>Blouse Piece:</strong> {product.blouse_piece}
            </p>
          )}

          {product.occasion && (
            <p>
              <strong>Occasion:</strong> {product.occasion}
            </p>
          )}

          {product.wash_care && (
            <p>
              <strong>Wash Care:</strong> {product.wash_care}
            </p>
          )}

          {product.collar_type && (
            <p>
              <strong>Collar Type:</strong> {product.collar_type}
            </p>
          )}

          {product.hood_type && (
            <p>
              <strong>Hood Type:</strong> {product.hood_type}
            </p>
          )}

          {product.pocket_type && (
            <p>
              <strong>Pocket Type:</strong> {product.pocket_type}
            </p>
          )}

          {product.waist_type && (
            <p>
              <strong>Waist Type:</strong> {product.waist_type}
            </p>
          )}

          {product.length && (
            <p>
              <strong>Length:</strong> {product.length}
            </p>
          )}

          {product.stretchable && (
            <p>
              <strong>Stretchable:</strong> {product.stretchable}
            </p>
          )}

          {product.age_group && (
            <p>
              <strong>Age Group:</strong> {product.age_group}
            </p>
          )}

          {product.kurta_length && (
            <p>
              <strong>Kurta Length:</strong> {product.kurta_length}
            </p>
          )}

          {product.bottom_type && (
            <p>
              <strong>Bottom Type:</strong> {product.bottom_type}
            </p>
          )}

          {product.dupatta_included && (
            <p>
              <strong>Dupatta:</strong> {product.dupatta_included}
            </p>
          )}

          {product.style_type && (
            <p>
              <strong>Style Type:</strong> {product.style_type}
            </p>
          )}

          {product.waist_rise && (
            <p>
              <strong>Waist Rise:</strong> {product.waist_rise}
            </p>
          )}

          {product.trend_type && (
            <p>
              <strong>Trend:</strong> {product.trend_type}
            </p>
          )}

          {product.brand && (
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
          )}

          {product.export_grade && (
            <p>
              <strong>Export Grade:</strong> {product.export_grade}
            </p>
          )}

          {product.condition_type && (
            <p>
              <strong>Condition:</strong> {product.condition_type}
            </p>
          )}

          {product.moq && (
            <p>
              <strong>Minimum Order Quantity:</strong> {product.moq}
            </p>
          )}

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

        </div>

        {/* Buttons */}
        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button
          className="buy-now-btn"
          onClick={() => buyNow(product)}
        >
          Buy Now
        </button>

      </div>
    </div>
  );
}

export default ProductDetails;