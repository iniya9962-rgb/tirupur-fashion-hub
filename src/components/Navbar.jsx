import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({
  cartCount,
  searchTerm,
  setSearchTerm
}) {
  const navigate = useNavigate();
  const [showAccount, setShowAccount] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const loggedIn = !!sessionStorage.getItem("userId");

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user");
    setShowAccount(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="navbar">
      <div className="logo">Tirupur Fashion Hub</div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
        <Link to="/my-orders">Orders</Link>
        <Link to="/vendor-login">Vendors</Link>

        {/* CUSTOMER ACCOUNT */}
        {loggedIn && user ? (
          <div className="account-container">

            <button
              className="account-btn"
              onClick={() => setShowAccount(!showAccount)}
            >
              👤 {user.name} ▾
            </button>

            {showAccount && (
              <div className="account-dropdown">

                <h3>My Account</h3>

                <div className="account-info">
                  <p>
                    <strong>👤 Name</strong>
                    <span>{user.name}</span>
                  </p>

                  <p>
                    <strong>📧 Email</strong>
                    <span>{user.email}</span>
                  </p>

                  <p>
                    <strong>📱 Phone</strong>
                    <span>{user.phone}</span>
                  </p>
                </div>

                <button
                  className="orders-btn"
                  onClick={() => {
                    setShowAccount(false);
                    navigate("/my-orders");
                  }}
                >
                  📦 My Orders
                </button>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <Link to="/cart" className="cart-icon">
          🛒 <strong>{cartCount}</strong>
        </Link>

      </nav>
    </header>
  );
}

export default Navbar;