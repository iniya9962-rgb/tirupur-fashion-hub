import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const customerId = sessionStorage.getItem("userId");

      if (!customerId) {
        alert("Please login first to view your orders.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/customer/${customerId}`
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          alert(data.message || "Failed to load orders");
        }
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        alert("Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

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
            key={order.id}
            className="order-card"
          >

            {order.image && (
              <img
                src={order.image}
                alt={order.product_name}
                className="cart-image"
              />
            )}

            <h3>{order.product_name}</h3>

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