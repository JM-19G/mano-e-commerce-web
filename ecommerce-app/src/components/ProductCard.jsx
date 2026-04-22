import { Link } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  if (!product) return <h2>Product not found</h2>;

  const naira = "\u20A6";
  const price =
    typeof product.price === "number"
      ? product.price
      : Number.parseFloat(product.price ?? "0");

  const stock = typeof product.stock === "number" ? product.stock : null;
  const outOfStock = stock === 0;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
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
            {product.location ? ` • ${product.location}` : ""}
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
