import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import ProductCard from "../components/ProductCard";
import { useToast } from "../hooks/useToast.js";
import { addToCart } from "../features/cart/cartSlice";
import products from "../data/products";

function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { toast } = useToast();

  const naira = "\u20A6";
  const leafIcon = "\uD83C\uDF3E";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const categories = [
    "All",
    "Crop Production",
    "Livestock Farming",
    "Farm Equipment",
    "Agrochemicals",
    "Processed Farm Products",
  ];

  const allTags = [...new Set(products.flatMap((p) => p.tags || []))];
  const allLocations = [...new Set(products.map((p) => p.location))];

  const handleSearch = useMemo(
    () => debounce((value) => setSearch(value), 300),
    []
  );

  useEffect(() => () => handleSearch.cancel(), [handleSearch]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchLocation =
        selectedLocation === "All" || product.location === selectedLocation;

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => product.tags?.includes(tag));

      return (
        matchCategory &&
        matchSearch &&
        matchPrice &&
        matchLocation &&
        matchTags
      );
    });
  }, [search, selectedCategory, priceRange, selectedTags, selectedLocation]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <h1>
        {leafIcon} Agro Market
      </h1>
      <h2>Cart Items: {cartItems.length}</h2>

      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />

      <div style={{ marginBottom: 15 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              marginRight: 8,
              marginBottom: 8,
              padding: "8px 14px",
              background: selectedCategory === cat ? "#2e7d32" : "#f0f0f0",
              color: selectedCategory === cat ? "white" : "black",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 15 }}>
        <p>
          <strong>Price Range:</strong> {naira}
          {priceRange[0].toLocaleString()} - {naira}
          {priceRange[1].toLocaleString()}
        </p>
        <input
          type="range"
          min="0"
          max="200000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        >
          <option value="All">All Locations</option>
          {allLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p>
          <strong>Tags:</strong>
        </p>
        <div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                margin: "4px",
                padding: "6px 12px",
                background: selectedTags.includes(tag) ? "#2e7d32" : "#f0f0f0",
                color: selectedTags.includes(tag) ? "white" : "black",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={(item) => {
              dispatch(addToCart(item));
              toast(`Added ${item.title} to cart`, { type: "success" });
            }}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p>No products found matching your filters.</p>
      )}
    </div>
  );
}

export default Home;
