import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Crop Production",
    "Livestock Farming",
    "Farm Equipment",
    "Agrochemicals",
    "Processed Farm Products",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌾 Agro Market</h1>

      <h2>Cart: {cartItems.length}</h2>

      {/* CATEGORY BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              marginRight: 10,
              background: selectedCategory === cat ? "green" : "#ddd",
              color: selectedCategory === cat ? "white" : "black",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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

export default App;