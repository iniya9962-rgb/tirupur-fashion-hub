import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorId = sessionStorage.getItem("vendorId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!vendorId) {
        alert("Vendor information not found. Please login again.");
        navigate("/vendor-login");
        return;
      }

      try {
        const response = await fetch(
          `https://tirupur-fashion-hub.onrender.com/api/orders/vendor/${vendorId}`
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
  }, [vendorId, navigate]);

  const updateStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `https://tirupur-fashion-hub.onrender.com/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update order");
        return;
      }

      // Update local state
      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ));

      alert("Order status updated successfully!");
    } catch (error) {
      console.error("❌ Error updating order:", error);
      alert("Unable to update order status.");
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="orders-page">
      <button  className="back-btn" onClick={() => navigate("/vendor-dashboard")}>
        ← Back
      </button>

      <h2>Vendor Orders</h2>

      {orders.length === 0 ? (
        <p>No orders received yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.product_name}</h3>
            <p><strong>Customer:</strong> {order.customer_name}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>

           {order.status === "Pending" && (
              <div className="order-actions">
                <button
                  className="accept-btn"
                  onClick={() => updateStatus(order.id, "Accepted")}
                >
                  Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(order.id, "Rejected")}
                >
                  Reject
                </button>
          </div>
          )}

            {order.status === "Accepted" && (
              <p className="accepted-message">
                ✅ Order Accepted
              </p>
            )}

            {order.status === "Rejected" && (
              <p className="rejected-message">
                ❌ Order Rejected
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;