import './App.css';
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Tirupur Fashion Hub</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Vendors</a>
          <a href="#">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Discover Surplus Fashion from Tirupur</h1>
        <p>
          Buy high-quality surplus garments directly from Tirupur textile vendors and manufacturers.
        </p>
        <button>Explore Products</button>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>

        <div className="category-grid">
          <div className="card">T-Shirts</div>
          <div className="card">Shirts</div>
          <div className="card">Hoodies</div>
          <div className="card">Leggings</div>
          <div className="card">Kids Wear</div>
          <div className="card">Kurta Set</div>  
          <div className="card">Sarees</div>   
          <div className="card">Tops</div>  
          <div className="card">Korean Style</div>
          <div className="card">Jeans</div>   
          <div className="card">Current Trending</div>
          <div className="card">Export Surplus</div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="featured">
       <h2>Featured Surplus Products</h2>
       <ProductList />      
      </section>
    </div>
  );
}

export default App;