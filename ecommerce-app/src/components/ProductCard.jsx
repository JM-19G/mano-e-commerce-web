import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 10,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* IMAGE */}
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

        {/* BADGE */}
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

        {/* TITLE */}
        <h3 style={{ margin: "10px 0 5px" }}>{product.title}</h3>

        {/* CATEGORY */}
        <p style={{ fontSize: 12, color: "#777" }}>
          {product.category}
        </p>

        {/* PRICE */}
        <p
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#2e7d32",
          }}
        >
          ₦{product.price}
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => onAdd(product)}
        style={{
          width: "100%",
          padding: 10,
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;