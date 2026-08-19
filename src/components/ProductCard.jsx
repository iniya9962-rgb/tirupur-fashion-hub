import { Link } from "react-router-dom";
function ProductCard({ 
  id,
  name, 
  price, 
  oldPrice, 
  image, 
  onAddToCart,
  onBuyNow
}) {  
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">
        <img src={image} alt={name} className="product-image" />
        <h3>{name}</h3>
      </Link>      

      <p className="price">₹{price}</p>

      <p className="old-price">₹{oldPrice}</p>

      <button className="cart-btn" onClick={onAddToCart}>
        Add to Cart
      </button>

      <button className="buy-now-btn"onClick={onBuyNow}>
        Buy Now
      </button>
    </div>
  );
}

export default ProductCard;