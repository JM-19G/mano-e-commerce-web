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
      {/* 🔥 MAIN GLASS CONTAINER */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "rgba(255,255,255,0.92)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* HEADER */}
        <h1 style={{ marginBottom: 5 }}>
          {leafIcon} Agro Market
        </h1>
        <p style={{ marginBottom: 20, color: "#555" }}>
          Cart Items: {cartItems.length}
        </p>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            marginBottom: 20,
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 15,
          }}
        />

        {/* CATEGORY */}
        <div style={{ marginBottom: 20 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                marginRight: 8,
                marginBottom: 8,
                padding: "8px 16px",
                background:
                  selectedCategory === cat
                    ? "#2e7d32"
                    : "#f3f4f6",
                color:
                  selectedCategory === cat
                    ? "white"
                    : "#333",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FILTER BAR */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 15,
            marginBottom: 20,
          }}
        >
          {/* PRICE */}
          <div>
            <p style={{ fontSize: 13, marginBottom: 5 }}>
              Price: {naira}
              {priceRange[0].toLocaleString()} - {naira}
              {priceRange[1].toLocaleString()}
            </p>

            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number(e.target.value),
                ])
              }
              style={{ width: "100%" }}
            />
          </div>

          {/* LOCATION */}
          <select
            value={selectedLocation}
            onChange={(e) =>
              setSelectedLocation(e.target.value)
            }
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          >
            <option value="All">All Locations</option>
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* TAGS */}
        <div style={{ marginBottom: 25 }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                margin: 4,
                padding: "6px 12px",
                background: selectedTags.includes(tag)
                  ? "#2e7d32"
                  : "#eee",
                color: selectedTags.includes(tag)
                  ? "white"
                  : "#333",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={(item) => {
                dispatch(addToCart(item));
                toast(`Added ${item.title}`, {
                  type: "success",
                });
              }}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ marginTop: 20 }}>
            No products found.
          </p>
        )}

        {/* FOOTER */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            color: "#666",
          }}
        >
          <p>🌾 Connecting farmers & buyers easily</p>

          <button
            onClick={handleLogout}
            style={{
              marginTop: 15,
              padding: "10px 20px",
              background: "#c62828",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Logout
          </button>

          <p style={{ marginTop: 10, fontSize: 12 }}>
            © 2026 Agro Market
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;