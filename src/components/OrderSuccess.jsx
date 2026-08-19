import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with Tirupur Fashion Hub.
          Your order has been confirmed and sent to the vendor.
        </p>

        <button
          className="continue-btn"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;