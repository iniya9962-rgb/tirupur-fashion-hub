import { useNavigate } from "react-router-dom";
import "./Orders.css";
import emailjs from "@emailjs/browser"
function Orders() {
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem("vendorOrders")) || [];

  const updateStatus = async (orderId, status) => {

  // Get vendor orders
  const vendorOrders =
    JSON.parse(localStorage.getItem("vendorOrders")) || [];

  // Find the order
  const order = vendorOrders.find(
    (item) => item.orderId === orderId
  );

  if (!order) {
    console.error("❌ Order not found");
    return;
  }

   console.log("📦 Order selected:", order);
   console.log("📧 Customer Email:", order.customerEmail);

  // Update vendor orders
  const updatedVendorOrders = vendorOrders.map((item) =>
    item.orderId === orderId
      ? { ...item, status }
      : item
  );

  localStorage.setItem(
    "vendorOrders",
    JSON.stringify(updatedVendorOrders)
  );

  // Update customer orders
  const customerOrders =
    JSON.parse(localStorage.getItem("customerOrders")) || [];

  const updatedCustomerOrders = customerOrders.map((item) =>
    item.orderId === orderId
      ? { ...item, status }
      : item
  );

  localStorage.setItem(
    "customerOrders",
    JSON.stringify(updatedCustomerOrders)
  );

  // 📧 Send status email to customer
  try {
    const response = await emailjs.send(
      "service_466q9sd",
      "template_m5qzsrs",
      {
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        productName: order.productName,
        quantity: order.quantity,
        price: order.price,
        status: status,
        vendorEmail: order.vendorEmail,
      },
      "BkBJdouBomcnqXGBA"
    );

    console.log("✅ CUSTOMER EMAIL SENT:", response);

  } catch (error) {
    console.error("❌ CUSTOMER EMAIL ERROR:", error);
    console.error("Status:", error?.status);
    console.error("Text:", error?.text);

    alert(
      `Customer email failed!\nStatus: ${error?.status}\nMessage: ${error?.text}`
    );
  }

  console.log("🔄 Status updated. Page will NOT reload during testing.");
};

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
          <div key={order.orderId} className="order-card">
            <h3>{order.productName}</h3>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>

           {order.status === "Pending" && (
              <div className="order-actions">
                <button
                  className="accept-btn"
                  onClick={() => updateStatus(order.orderId, "Accepted")}
                >
                  Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(order.orderId, "Rejected")}
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