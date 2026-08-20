import {useNavigate} from "react-router-dom";
import { sendVendorOrderEmail } from "../utils/sendVendorOrderEmail";

function Cart({ cartItems, removeFromCart, clearCart }) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const customerId = sessionStorage.getItem("userId");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!customerId || !user) {
      alert("Please login first to place an order.");
      navigate("/login");
      return;
    }

    try {
      // Place orders through backend
      for (const item of cartItems) {
        const vendorId = item.vendorId ?? item.vendor_id;
        const vendorEmail = item.vendorEmail ?? item.vendor_email;
        const vendorName = item.vendorName ?? item.vendor_name;

        if (!vendorId) {
          alert(`The product "${item.name}" is not linked to a vendor.`);
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
          productId: item.id,
          productName: item.name,
          category: item.category,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
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
            productName: item.name,
            customerName: user.name,
            customerEmail: user.email,
            quantity: item.quantity || 1,
            price: item.price,
            status: "Pending",
          });
        } catch (emailError) {
          console.error("Vendor notification email failed:", emailError);
        }
      }

      clearCart();
      alert("Order placed successfully!");
      navigate("/");

    } catch (error) {
      console.error("❌ Checkout error:", error);
      alert("Unable to process order. Please try again.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button 
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;