import { useNavigate } from "react-router-dom";

function CustomerOrders() {
  const navigate = useNavigate();

  const orders =
    JSON.parse(localStorage.getItem("customerOrders")) || [];

  return (
    <div className="orders-page">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="order-card"
          >

            <img
              src={order.image}
              alt={order.productName}
              className="cart-image"
            />

            <h3>{order.productName}</h3>

            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>

            <p>
              <strong>Price:</strong> ₹{order.price}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default CustomerOrders;