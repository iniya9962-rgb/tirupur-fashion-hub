import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductList({ 
  selectedCategory,
  searchTerm,
  addToCart,
  buyNow }) {

    const [vendorProducts, setVendorProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/products");
          const data = await response.json();
          
          if (response.ok) {
            setVendorProducts(data);
          }
        } catch (error) {
          console.error("❌ Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, []);

    const allProducts = [...products, ...vendorProducts];
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || 
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
   
  if (loading) {
    return <div className="product-list"><p>Loading products...</p></div>;
  }

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (

        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice}
          image={product.image}
          onAddToCart={() => addToCart(product)}
          onBuyNow={() => buyNow(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;