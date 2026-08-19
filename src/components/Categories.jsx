import categories from "../data/categories";

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <div
          className={`category-card ${
            selectedCategory === category.name ? "active" : ""
          }`}
          key={category.id}
          onClick={() => setSelectedCategory(category.name)}
        >
          <img src={category.image} alt={category.name} />
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Categories;