import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import products from "../data/products";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === Number(id));

  // ✅ Load reviews from localStorage
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    return saved ? JSON.parse(saved) : product?.reviews || [];
  });

  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  if (!product) return <h2>Product not found</h2>;

  // ✅ Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  // ✅ Handle review submit
  const handleReview = () => {
    if (!text) return;

    const newReview = { text, rating };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);

    // ✅ Save to localStorage
    localStorage.setItem(
      `reviews_${id}`,
      JSON.stringify(updatedReviews)
    );

    setText("");
    setRating(5);
  };

  return (
    <div style={{ padding: 20 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: 300, height: 300, objectFit: "cover" }}
      />

      <h1>{product.title}</h1>

      {/* ⭐ Average Rating */}
      <p>
        ⭐ {averageRating} ({reviews.length} reviews)
      </p>

      <h2>₦{product.price}</h2>
      <p>{product.category}</p>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>

      <hr />

      <h2>⭐ Reviews</h2>

      {/* ADD REVIEW */}
      <div style={{ marginBottom: 20 }}>
        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />

        <br />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>5 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={1}>1 ⭐</option>
        </select>

        <br />

        <button onClick={handleReview}>
          Submit Review
        </button>
      </div>

      {/* SHOW REVIEWS */}
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
  );
}

export default ProductDetails;