
import { useNavigate } from "react-router-dom";

function VendorDashboard() {
  const navigate = useNavigate();

  const vendor = JSON.parse(localStorage.getItem("vendor"));

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="vendor-dashboard">
      <h1>🏭 Vendor Dashboard</h1>

      <h2>
        Welcome, {vendor?.shopName || "Vendor"} 👋
      </h2>

      <p>Manage your products and business from here.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/vendor/add-product")}>
          <h3>➕ Add New Product</h3>
          <p>Upload surplus textile products.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/vendor/my-products")}>
          <h3>📦 My Products</h3>
          <p>View all products uploaded by you.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/vendor/inventory")}>
          <h3>📊 Inventory</h3>
          <p>Manage stock and product availability.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/vendor/orders")}>
          <h3>🧾 Orders</h3>
          <p>Track customer orders and requests.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/vendor/sales-analytics")}>
          <h3>📈 Sales Analytics</h3>
          <p>View sales performance and business insights.</p>
        </div>
      </div>

      <button className="vendor-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default VendorDashboard;
