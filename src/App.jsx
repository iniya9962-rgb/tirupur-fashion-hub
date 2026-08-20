import { useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import heroImage from "./assets/hero.jpg";
import Cart from "./components/Cart";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VendorRegistration from "./components/VendorRegistration";
import VendorLogin from "./components/VendorLogin";
import VendorDashboard from "./components/VendorDashboard";
import AddProduct from "./components/AddProduct";
import MyProducts from "./components/MyProducts";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import SalesAnalytics from "./components/SalesAnalytics";
import OrderSuccess from "./components/OrderSuccess";
import CustomerOrders from "./components/CustomerOrders";
import About from "./components/About";
import { sendVendorOrderEmail } from "./utils/sendVendorOrderEmail";

function App() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const  [cartItems, setCartItems] = useState([]);  
  console.log(cartItems);
  const addToCart = (product) => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);
    if (alreadyInCart) {
      alert(`${product.name} is already in the cart.`);
      return;
    }
    setCartItems([...cartItems, product]);
    alert(`${product.name} has been added to the cart.`);
  }
  
  const buyNow = async(product) => {
  const customerId = sessionStorage.getItem("userId");
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!customerId || !user) {
    alert("Please login first to place an order.");
    navigate("/login");
    return;
  }

  try {
    const vendorId = product.vendorId ?? product.vendor_id;
    const vendorEmail = product.vendorEmail ?? product.vendor_email;
    const vendorName = product.vendorName ?? product.vendor_name;

    if (!vendorId) {
      alert("This product is not linked to a vendor.");
      return;
    }

    const orderData = {
      customerId: parseInt(customerId),
      customerEmail: user.email,
      customerName: user.name,
      customerPhone: user.phone || "",
      vendorId,
      vendorEmail,
      vendorName,
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      quantity: 1,
      image: product.image,
      status: "Pending"
    };

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to place order");
      return;
    }

    try {
      await sendVendorOrderEmail({
        vendorEmail,
        vendorName,
        productName: product.name,
        customerName: user.name,
        customerEmail: user.email,
        quantity: 1,
        price: product.price,
        status: "Pending",
      });
    } catch (emailError) {
      console.error("Vendor notification email failed:", emailError);
    }

    alert("Order placed successfully!");
    navigate("/order-success");
  } catch (error) {
    console.error("❌ Buy now error:", error);
    alert("Unable to process order. Please try again.");
  }
};

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  }

  const [searchTerm, setSearchTerm] = useState("");

  const clearCart = () => {
    setCartItems([]);
  };

  return (    
      <Routes>

        {/*hOME pAGE*/}
        <Route        
          path="/" 
          element={
            <div className="app">
              <Navbar 
                cartCount={cartItems.length}                
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            
              {/* Hero Section */}
              {searchTerm === "" && (
                <section className="hero">
                  <div className="hero-overlay">
                    <h1>Discover Surplus Fashion from Tirupur</h1>
                    <p>
                      Top quality surplus clothes at unbeatable prices.
                      Sustainable fashion, smart choice.
                    </p>
                    <button className="hero-btn">Shop Now</button>
                  </div>
 
                  <div className="hero-image">
                    <img src={heroImage} alt="Tirupur Fashion Collection" />
                    <svg className="hero-plant" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                     <ellipse cx="60" cy="150" rx="30" ry="8" fill="#00000014" />
                     <path d="M40 150 L45 100 L75 100 L80 150 Z" fill="#c9946b" />
                     <path d="M45 100 L75 100 L72 90 L48 90 Z" fill="#a97a54" />
                     <path d="M60 100 C 20 90, 15 40, 45 15 C 40 55, 50 80, 60 100 Z" fill="#3f7d4f" />
                     <path d="M60 100 C 100 90, 105 40, 75 15 C 80 55, 70 80, 60 100 Z" fill="#4f9560" />
                     <path d="M60 100 C 45 60, 55 20, 60 0 C 65 20, 75 60, 60 100 Z" fill="#5aab6c" />
                    </svg>
                  </div>
                </section>
              )}

              
             {/* Categories */}
             {searchTerm === "" && (
                <section id="categories" className="categories">
                  <h2>Shop by Category</h2>
                  <Categories
                   selectedCategory={selectedCategory}
                   setSelectedCategory={setSelectedCategory}
                  />
                </section>
              )}

              {/* Featured Products */}
                <section id="produccts" className="featured">
                  <h2>
                   {searchTerm !== ""
                    ? `Search Results for "${searchTerm}"`
                    : selectedCategory === "All"
                    ? "Featured Surplus Products"
                    : selectedCategory + " Products"}
                  </h2>

                  <ProductList
                    selectedCategory="All"
                    searchTerm={searchTerm}
                    addToCart={addToCart}
                    buyNow={buyNow}
                  />
                </section>
            </div>
          }
        />   

                {/* Products Page */}
        <Route
          path="/products"
          element={
            <div className="app">
              <Navbar
                cartCount={cartItems.length}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <section className="featured">
                <h2>All Products</h2>

                <ProductList
                  selectedCategory="All"
                  searchTerm={searchTerm}
                  addToCart={addToCart}
                  buyNow={buyNow}
                />
              </section>
            </div>
          }
        />

        {/* Categories Page */}
        <Route
          path="/categories"
          element={
            <div className="app">
              <Navbar
                cartCount={cartItems.length}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <section className="categories">
                <h2>Shop by Category</h2>

                <Categories
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </section>
            </div>
          }
        />
            
        <Route
          path="/product/:id"
          element={
            <ProductDetails 
              addToCart={addToCart}
              buyNow={buyNow} 
            />
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        
        <Route
          path="/vendor-registration"
          element={<VendorRegistration />}
        />
        <Route
          path="/vendor-login"
          element={<VendorLogin />}
        />
        <Route
          path="/vendor-dashboard"
          element={<VendorDashboard />}
        />
        <Route
          path="/vendor/add-product"
          element={<AddProduct />}
        />
        <Route
          path="/vendor/my-products"
          element={<MyProducts />}
        />
        <Route
          path="/vendor/inventory"
          element={<Inventory />}
        />
        <Route
          path="/vendor/orders"
          element={<Orders />}
        />
        <Route
          path="/cart"
          element={
            <Cart 
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/vendor/sales-analytics"
          element={<SalesAnalytics />}
        />
        <Route
          path="/order-success"
          element={<OrderSuccess/>}
        />
        <Route
          path="/my-orders"
          element={<CustomerOrders />}
        />
        <Route
          path="/about"
          element={<About/>}
        />  
      </Routes>    
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
