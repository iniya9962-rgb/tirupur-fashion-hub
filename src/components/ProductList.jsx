import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductList({ 
  selectedCategory,
  searchTerm,
  addToCart,
  buyNow }) {

    const vendorProducts = JSON.parse(localStorage.getItem("vendorproducts")) || [];

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