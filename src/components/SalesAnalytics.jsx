import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesAnalytics.css";

function SalesAnalytics() {
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
          `http://localhost:5000/api/orders/vendor/${vendorId}`
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

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  const acceptedOrders = orders.filter(
    (order) => order.status === "Accepted"
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  const totalSales = acceptedOrders.reduce(
    (sum, order) =>
      sum + Number(order.price) * Number(order.quantity || 1),
    0
  );

  const totalOrders = orders.length;

  const productsSold = acceptedOrders.reduce(
    (sum, order) =>
      sum + Number(order.quantity || 1),
    0
  );

  // Sales by Product
  const salesByProduct = {};

  acceptedOrders.forEach((order) => {
    const productName = order.product_name;
    const quantity = Number(order.quantity || 1);
    const revenue = Number(order.price) * quantity;

    if (!salesByProduct[productName]) {
      salesByProduct[productName] = {
        quantity: 0,
        revenue: 0,
      };
    }

    salesByProduct[productName].quantity += quantity;
    salesByProduct[productName].revenue += revenue;
  });

  // Top Selling Product
  const topSellingProduct = Object.entries(salesByProduct).sort(
    (a, b) => b[1].quantity - a[1].quantity
  )[0];

  return (
    <div className="sales-analytics">

      <button
        className="back-btn"
        onClick={() => navigate("/vendor-dashboard")}
      >
        ← Back
      </button>

      <h1>📈 Sales Analytics</h1>

      <p>Track your sales performance and business growth.</p>

      {/* Analytics Cards */}
      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>💰 Total Sales</h3>
          <h2>₹{totalSales}</h2>
        </div>

        <div className="analytics-card">
          <h3>🧾 Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="analytics-card">
          <h3>📦 Products Sold</h3>
          <h2>{productsSold}</h2>
        </div>

        <div className="analytics-card">
          <h3>⏳ Pending Orders</h3>
          <h2>{pendingOrders.length}</h2>
        </div>

      </div>

      {/* Sales by Product */}
      <div className="sales-overview">

        <h2>📊 Sales by Product</h2>

        {Object.keys(salesByProduct).length === 0 ? (
          <p>No completed sales yet.</p>
        ) : (
          Object.entries(salesByProduct).map(([productName, data]) => (
            <div key={productName} className="product-sales-row">
              <div>
                <h3>{productName}</h3>
              </div>

              <div className="product-right">
                <p>Quantity Sold: <strong>{data.quantity}</strong></p>
                <p>Revenue: <strong>₹{data.revenue}</strong></p>
              </div>
            </div>
          ))
        )}

      </div>

      {/* Top Selling Product */}
      <div className="sales-overview">

        <h2>🏆 Top-Selling Product</h2>

        {topSellingProduct ? (
          <div className="product-sales-row">
            <div>
              <h3>{topSellingProduct[0]}</h3>
            </div>

            <div className="product-right">
              <p>Quantity Sold: <strong>{topSellingProduct[1].quantity}</strong></p>
              <p>Revenue: <strong>₹{topSellingProduct[1].revenue}</strong></p>
            </div>
          </div>
        ) : (
          <p>No completed sales yet.</p>
        )}

      </div>

      {/* Revenue per Product */}
      <div className="sales-overview">

        <h2>💰 Revenue per Product</h2>

        {Object.keys(salesByProduct).length === 0 ? (
          <p>No revenue data available yet.</p>
        ) : (
          Object.entries(salesByProduct).map(([productName, data]) => (
            <div key={productName} className="product-sales-row">
              <div>
                <h3>{productName}</h3>
              </div>

              <div className="product-right">
                <p>Revenue: <strong>₹{data.revenue}</strong></p>
              </div>
            </div>
          ))
        )}

      </div>

      {/* Quantity Sold per Product */}
      <div className="sales-overview">

        <h2>🔢 Quantity Sold per Product</h2>

        {Object.keys(salesByProduct).length === 0 ? (
          <p>No sales quantity data available yet.</p>
        ) : (
          Object.entries(salesByProduct).map(([productName, data]) => (
            <div key={productName} className="product-sales-row">
              <div>
                <h3>{productName}</h3>
              </div>

              <div className="product-right">
                <p>Quantity Sold: <strong>{data.quantity}</strong></p>
              </div>
            </div>
          ))
        )}

      </div>

      {/* Sales Chart */}
      <div className="sales-overview">

        <h2>📈 Sales Chart</h2>

        {Object.keys(salesByProduct).length === 0 ? (
          <p>No sales data available for chart.</p>
        ) : (
          <div className="sales-chart">
            {Object.entries(salesByProduct).map(([productName, data]) => (
              <div key={productName} className="chart-item">
                <div
                  className="chart-bar"
                  style={{ height: `${Math.max(data.revenue / 5, 20)}px` }}
                ></div>

                <p className="chart-label">{productName}</p>
                <p className="chart-value">₹{data.revenue}</p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default SalesAnalytics;