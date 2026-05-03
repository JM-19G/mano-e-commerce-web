import PageWrapper from "../components/PageWrapper";
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

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
        product.price >= priceRange[0] &&
        product.price <= priceRange[1];

      const matchLocation =
        selectedLocation === "All" ||
        product.location === selectedLocation;

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          product.tags?.includes(tag)
        );

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
    <PageWrapper>
  <div style={styles.container}>
    
    {/* HEADER */}
    <div style={styles.header}>
      <h1>🌾 Agro Market</h1>
      <p style={styles.subtitle}>
        Discover fresh farm products, livestock & equipment
      </p>
    </div>

    {/* FILTER SECTION */}
    <div style={styles.filterBox}>
      
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        style={styles.search}
      />

      {/* CATEGORY */}
      <div style={styles.row}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              ...styles.chip,
              background:
                selectedCategory === cat ? "#2e7d32" : "#f1f5f9",
              color:
                selectedCategory === cat ? "#fff" : "#333",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRICE */}
      <p style={{ marginTop: 10 }}>
        <strong>Price:</strong> ₦{priceRange[0].toLocaleString()} - ₦
        {priceRange[1].toLocaleString()}
      </p>

      <input
        type="range"
        min="0"
        max="200000"
        step="1000"
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([priceRange[0], Number(e.target.value)])
        }
        style={{ width: "100%" }}
      />

      {/* LOCATION */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        style={styles.select}
      >
        <option value="All">All Locations</option>
        {allLocations.map((loc) => (
          <option key={loc}>{loc}</option>
        ))}
      </select>

      {/* TAGS */}
      <div style={styles.row}>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            style={{
              ...styles.tag,
              background: selectedTags.includes(tag)
                ? "#2e7d32"
                : "#eef2f7",
              color: selectedTags.includes(tag)
                ? "#fff"
                : "#333",
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

    {/* PRODUCTS */}
    <div style={styles.grid}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={(item) => {
            dispatch(addToCart(item));
            toast(`Added ${item.title}`, { type: "success" });
          }}
        />
      ))}
    </div>

  </div>
</PageWrapper>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
  },

  filterBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: 25,
  },

  search: {
    width: "97%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    marginBottom: 15,
  },

  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },

  chip: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
  },

  tag: {
    padding: "5px 10px",
    borderRadius: 20,
    border: "none",
    fontSize: 12,
    cursor: "pointer",
  },

  select: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    marginTop: 10,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 20,
  },
};

export default Home;