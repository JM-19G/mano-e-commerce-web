import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import products from "../data/products";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

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
          reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

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
    <div style={{ padding: 20 }}>
      
      {/* 🔥 TOP SECTION (IMAGE + DETAILS) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        {/* IMAGE */}
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

        {/* DETAILS */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h1>{product.title}</h1>

          <p style={{ fontSize: 14, color: "#777" }}>
            {product.category}
          </p>

          <p style={{ fontSize: 18 }}>
            ⭐ {averageRating} ({reviews.length} reviews)
          </p>

          <h2 style={{ color: "#2e7d32" }}>
            ₦{product.price}
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

          <br />

          <button
            onClick={() => dispatch(addToCart(product))}
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

      {/* 🔥 REVIEWS SECTION */}
      <div>
        <h2>⭐ Customer Reviews</h2>

        {/* ADD REVIEW */}
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

          <br />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ marginTop: 10 }}
          >
            <option value={5}>5 ⭐</option>
            <option value={4}>4 ⭐</option>
            <option value={3}>3 ⭐</option>
            <option value={2}>2 ⭐</option>
            <option value={1}>1 ⭐</option>
          </select>

          <br />

          <button
            onClick={handleReview}
            style={{
              marginTop: 10,
              padding: 10,
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

        {/* DISPLAY REVIEWS */}
        {reviews.length === 0 && <p>No reviews yet</p>}

        {reviews.map((r, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ddd",
              padding: 10,
            }}
          >
            <p>{r.text}</p>
            <p>{"⭐".repeat(r.rating)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;