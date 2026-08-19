import {useNavigate} from "react-router-dom";
import emailjs from "@emailjs/browser"
function Cart({ cartItems, removeFromCart, clearCart }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const existingOrders = JSON.parse(localStorage.getItem("vendorOrders")) || [];

    const newOrders = cartItems.map(item => ({
      productName: item.name,
      customerName: "Customer", // Placeholder for customer name
      quantity: item.quantity || 1, // Assuming quantity is 1 for each item in the cart
      price: item.price,
      vendorEmail: item.vendorEmail,
      vendorName: item.vendorName,
      status: "Pending"
    }));

    localStorage.setItem("vendorOrders", JSON.stringify([...existingOrders, ...newOrders]));
    clearCart(); // Clear the cart after placing the order
    alert("Order placed successfully!");
    navigate("/");

    newOrders.forEach((order) => {
  emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    {
      vendor_email: order.vendorEmail,
      vendor_name: order.vendorName,
      product_name: order.productName,
      customer_name: order.customerName,
      quantity: order.quantity,
      price: order.price,
    },
    "YOUR_PUBLIC_KEY"
  );
});
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