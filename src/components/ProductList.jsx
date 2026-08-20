import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductList({
  selectedCategory,
  searchTerm,
  addToCart,
  buyNow,
}) {
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const response = await fetch("https://tirupur-fashion-hub.onrender.com/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setVendorProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Combine default products + database products
  const allProducts = [...products, ...vendorProducts];

  const normalizedSearch = (searchTerm || "").trim().toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() ===
        selectedCategory?.toLowerCase();

    const searchableText = [
      product.name,
      product.category,
      product.description,
      product.fabric,
      product.pattern,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearch === "" ||
      searchableText.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="product-list">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductCard
          key={`${product.id}-${product.vendor_id || "default"}`}
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