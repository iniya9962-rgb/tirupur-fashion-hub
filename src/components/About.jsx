import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="about-container">

        <h1>🧵 About Tirupur Fashion Hub</h1>

        <p className="about-intro">
          Tirupur Fashion Hub is a textile marketplace that connects
          customers with vendors offering quality surplus fashion products
          from Tirupur.
        </p>

        <div className="about-sections">

          <div className="about-card">
            <h2>🎯 Our Mission</h2>
            <p>
              Our mission is to provide affordable, quality fashion products
              while helping textile vendors sell their surplus products
              efficiently.
            </p>
          </div>

          <div className="about-card">
            <h2>👕 What We Offer</h2>
            <p>
              Customers can explore T-Shirts, Shirts, Hoodies, Sarees,
              Jeans, Kids Wear and other surplus textile products.
            </p>
          </div>

          <div className="about-card">
            <h2>🏭 For Vendors</h2>
            <p>
              Vendors can register their shops, upload products, manage
              inventory, track orders and view sales analytics.
            </p>
          </div>

          <div className="about-card">
            <h2>🌱 Sustainable Fashion</h2>
            <p>
              By promoting surplus textile products, Tirupur Fashion Hub
              encourages smarter consumption and helps reduce textile waste.
            </p>
          </div>

        </div>

        <div className="about-footer">
          <h2>🛍️ Tirupur Fashion Hub</h2>
          <p>
            Quality Fashion • Affordable Prices • Sustainable Choice
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;