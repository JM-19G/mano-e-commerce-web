import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useToast } from "../hooks/useToast.js";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const naira = "\u20A6";
  const star = "\u2B50";
  const fire = "\uD83D\uDD25";

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
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  const handleReview = () => {
    if (!text.trim()) return;

    const newReview = { text: text.trim(), rating };
    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setText("");
    setRating(5);
    toast("Review submitted", { type: "success" });
  };

  return (
    <div style={{ padding: 20, textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div style={{ flex: 1, minWidth: 250 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 250 }}>
          <h1 style={{ textAlign: "left" }}>{product.title}</h1>

          <p style={{ fontSize: 14, color: "#777" }}>{product.category}</p>

          <p style={{ fontSize: 18, margin: "8px 0" }}>
            {star} {averageRating} ({reviews.length} reviews)
          </p>

          <h2 style={{ color: "#2e7d32", marginTop: 8 }}>
            {naira}
            {Number(product.price).toLocaleString()}
          </h2>

          {product.tag && (
            <span
              style={{
                display: "inline-block",
                padding: "5px 10px",
                background: "green",
                color: "white",
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              {product.tag}
            </span>
          )}

          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast(`Added ${product.title} to cart`, { type: "success" });
            }}
            style={{
              marginTop: 10,
              padding: 12,
              width: "100%",
              background: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: 5,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div>
        <h2>
          {fire} {star} Customer Reviews
        </h2>

        <div style={{ marginBottom: 20 }}>
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 5,
            }}
          />

          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} {star}
                </option>
              ))}
            </select>

            <button
              onClick={handleReview}
              style={{
                padding: "10px 14px",
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Submit Review
            </button>
          </div>
        </div>

        {reviews.length === 0 && <p>No reviews yet</p>}

        {reviews.map((r, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ddd",
              padding: 10,
            }}
          >
            <p style={{ margin: "0 0 6px" }}>{r.text}</p>
            <p style={{ margin: 0 }}>{star.repeat(r.rating)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
