import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import debounce from "lodash.debounce";

function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Filters State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const categories = [
    "All", "Crop Production", "Livestock Farming", 
    "Farm Equipment", "Agrochemicals", "Processed Farm Products"
  ];

  // Get unique tags and locations
  const allTags = [...new Set(products.flatMap(p => p.tags || []))];
  const allLocations = [...new Set(products.map(p => p.location))];

  // Debounced Search
  const handleSearch = useMemo(
    () => debounce((value) => setSearch(value), 300),
    []
  );

  useEffect(() => {
    return () => handleSearch.cancel();
  }, [handleSearch]);

  // Main Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchLocation = selectedLocation === "All" || product.location === selectedLocation;
      
      const matchTags = selectedTags.length === 0 || 
        selectedTags.every(tag => product.tags?.includes(tag));

      return matchCategory && matchSearch && matchPrice && matchLocation && matchTags;
    });
  }, [search, selectedCategory, priceRange, selectedTags, selectedLocation]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <h1>🌾 Agro Market</h1>
      <h2>Cart Items: {cartItems.length}</h2>

      {/* SEARCH BAR */}
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
          fontSize: 16
        }}
      />

      {/* CATEGORY FILTERS */}
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
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRICE RANGE */}
      <div style={{ marginBottom: 15 }}>
        <p><strong>Price Range:</strong> ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}</p>
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

      {/* LOCATION FILTER */}
      <div style={{ marginBottom: 15 }}>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        >
          <option value="All">All Locations</option>
          {allLocations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* TAGS FILTER */}
      <div style={{ marginBottom: 20 }}>
        <p><strong>Tags:</strong></p>
        <div>
          {allTags.map(tag => (
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
                cursor: "pointer"
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
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
            onAdd={(item) => dispatch(addToCart(item))}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && <p>No products found matching your filters.</p>}
    </div>
  );
}

export default Home;