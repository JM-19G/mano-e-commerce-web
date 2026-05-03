import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

function ProductCard({ product, onAdd }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  if (!product) return null;

  const naira = "\u20A6";
  const bullet = "\u2022";

  const price =
    typeof product.price === "number"
      ? product.price
      : Number.parseFloat(product.price ?? "0");

  const stock = typeof product.stock === "number" ? product.stock : null;
  const outOfStock = stock === 0;

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlist = (e) => {
    e.preventDefault(); // ✅ prevents navigation when clicking heart
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          overflow: "hidden",
          background: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          transition: "0.2s",
        }}
      >
        {/* ❤️ Wishlist */}
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "white",
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            cursor: "pointer",
            fontSize: 14,
            zIndex: 2,
          }}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: 160, // 👈 smaller height (cleaner grid)
            objectFit: "cover",
          }}
        />

        {/* DETAILS */}
        <div style={{ padding: 10 }}>
          <h3 style={{ margin: "0 0 5px", fontSize: 14 }}>
            {product.title}
          </h3>

          <p style={{ fontSize: 12, color: "#777", marginBottom: 6 }}>
            {product.category}
            {product.location ? ` ${bullet} ${product.location}` : ""}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
              {naira}
              {price.toLocaleString()}
            </span>

            {stock !== null && (
              <span
                style={{
                  color: outOfStock ? "red" : "#2e7d32",
                  fontSize: 11,
                }}
              >
                {outOfStock ? "Out" : stock}
              </span>
            )}
          </div>
        </div>

        {/* BUTTON */}
        <div style={{ padding: 10 }}>
          <button
            onClick={(e) => {
              e.preventDefault(); // ✅ stops link navigation
              onAdd?.(product);
            }}
            disabled={outOfStock}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "none",
              background: outOfStock ? "#ccc" : "#2e7d32",
              color: "white",
              cursor: outOfStock ? "not-allowed" : "pointer",
              fontSize: 13,
            }}
          >
            {outOfStock ? "Out of Stock" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;