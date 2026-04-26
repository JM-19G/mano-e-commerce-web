import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

function ProductCard({ product, onAdd }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  if (!product) return <h2>Product not found</h2>;

  const naira = "\u20A6";
  const bullet = "\u2022";

  const price =
    typeof product.price === "number"
      ? product.price
      : Number.parseFloat(product.price ?? "0");

  const stock = typeof product.stock === "number" ? product.stock : null;
  const outOfStock = stock === 0;

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "white",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease",
      }}
    >
      {/* ❤️ WISHLIST BUTTON */}
      <button
        onClick={handleWishlist}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "white",
          border: "none",
          borderRadius: "50%",
          width: 30,
          height: 30,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          fontSize: 14,
          zIndex: 10,
        }}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div style={{ background: "#f3f4f6" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div style={{ padding: 12 }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>
            {product.title}
          </h3>

          <p style={{ margin: "0 0 10px", fontSize: 13, color: "#6b7280" }}>
            {product.category}
            {product.location ? ` ${bullet} ${product.location}` : ""}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span style={{ fontWeight: 700, color: "#2e7d32" }}>
              {naira}
              {Number.isFinite(price) ? price.toLocaleString() : "0"}
            </span>

            {stock !== null && (
              <span
                style={{
                  fontSize: 12,
                  color: outOfStock ? "#c62828" : "#2e7d32",
                }}
              >
                {outOfStock ? "Out of stock" : `${stock} in stock`}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div style={{ padding: 12, paddingTop: 0 }}>
        <button
          onClick={() => onAdd?.(product)}
          disabled={outOfStock}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "none",
            cursor: outOfStock ? "not-allowed" : "pointer",
            background: outOfStock ? "#d1d5db" : "#2e7d32",
            color: "white",
            fontWeight: 600,
          }}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;