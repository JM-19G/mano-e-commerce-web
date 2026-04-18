import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import debounce from "lodash.debounce";

function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Crop Production",
    "Livestock Farming",
    "Farm Equipment",
    "Agrochemicals",
    "Processed Farm Products",
  ];

  // 🔍 Debounced search handler
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 300),
    []
  );

  // 🧹 cleanup debounce to avoid memory leaks
  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  // 1. filter by category
  let filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // 2. filter by search
  filteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>🌾 Agro Market</h1>

      <h2>Cart Items: {cartItems.length}</h2>

      {/* SEARCH INPUT (DEBOUNCED) */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          padding: 10,
          width: "100%",
          marginBottom: 20,
          border: "1px solid #ccc",
          borderRadius: 5,
        }}
      />

      {/* CATEGORY FILTER */}
      <div style={{ marginBottom: 20 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              marginRight: 10,
              padding: "8px 12px",
              background: selectedCategory === cat ? "green" : "#ddd",
              color: selectedCategory === cat ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 15,
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={(item) => dispatch(addToCart(item))}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;