import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Wishlist
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  // Reviews (Your existing code)
  const savedReviews = localStorage.getItem(`reviews_${product.id}`);
  const reviews = savedReviews ? JSON.parse(savedReviews) : [];
  const avg =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  // Stock Status
  let stockStatus = { text: "In Stock", color: "#2e7d32" };
  if (product.stock === 0) stockStatus = { text: "Out of Stock", color: "red" };
  else if (product.stock < 20) stockStatus = { text: "Low Stock", color: "orange" };

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 12,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {/* Wishlist Heart */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigating to details
          if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
          } else {
            dispatch(addToWishlist(product));
          }
        }}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          cursor: "pointer",
          fontSize: 22,
          zIndex: 10,
        }}
      >
        {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      {/* Clickable Area - Product Details */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />

        {/* Tag */}
        {product.tag && (
          <span
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "4px 8px",
              background: "green",
              color: "white",
              fontSize: 12,
              borderRadius: 5,
            }}
          >
            {product.tag}
          </span>
        )}

        <h3 style={{ margin: "10px 0 5px" }}>{product.title}</h3>

        <p style={{ fontSize: 12, color: "#777" }}>
          {product.category} • {product.location}
        </p>

        {/* Average Rating */}
        {avg && (
          <p style={{ fontSize: 14, color: "#555", margin: "4px 0" }}>
            ⭐ {avg}
          </p>
        )}

        {/* Stock Status */}
        <p style={{ color: stockStatus.color, fontWeight: "bold", fontSize: 14 }}>
          {stockStatus.text} ({product.stock})
        </p>

        <p
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#2e7d32",
            margin: "8px 0",
          }}
        >
          ₦{product.price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAdd(product)}
        disabled={product.stock === 0}
        style={{
          width: "100%",
          padding: 10,
          background: product.stock === 0 ? "#ccc" : "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: product.stock === 0 ? "not-allowed" : "pointer",
          marginTop: 8,
        }}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;