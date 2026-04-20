import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import products from "../data/products";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    return saved ? JSON.parse(saved) : product?.reviews || [];
  });

  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  if (!product) return <h2>Product not found</h2>;

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  // Get Related Products (same category, exclude current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleReview = () => {
    if (!text) return;
    const newReview = { text, rating };
    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setText("");
    setRating(5);
  };

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      {/* Main Product Section */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>
        {/* Image */}
        <div style={{ flex: "1", minWidth: 300 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
        </div>

        {/* Product Info */}
        <div style={{ flex: "1", minWidth: 300 }}>
          <h1>{product.title}</h1>
          <p style={{ fontSize: 16, color: "#555" }}>{product.category} • {product.location}</p>

          <p style={{ fontSize: 20, margin: "10px 0" }}>
            ⭐ {averageRating} ({reviews.length} reviews)
          </p>

          <h2 style={{ color: "#2e7d32" }}>₦{product.price}</h2>

          <p><strong>Stock:</strong> {product.stock} units</p>

          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={product.stock === 0}
            style={{
              marginTop: 20,
              padding: "14px 30px",
              fontSize: 18,
              background: product.stock === 0 ? "#ccc" : "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginBottom: 50 }}>
        <h2>Customer Reviews</h2>
        {/* Review form and list (same as before) */}
        <div style={{ marginBottom: 20 }}>
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 8 }}
          />
          <br /><br />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
          </select>
          <button onClick={handleReview} style={{ marginLeft: 15, padding: "10px 20px" }}>
            Submit Review
          </button>
        </div>

        {reviews.map((r, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "15px 0" }}>
            <p>{r.text}</p>
            <p>{"⭐".repeat(r.rating)}</p>
          </div>
        ))}
      </div>

      {/* 🔥 RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div>
          <h2>You May Also Like</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}>
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard product={item} onAdd={(p) => dispatch(addToCart(p))} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;