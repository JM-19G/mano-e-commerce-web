import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ddd", padding: 10 }}>
      
      {/* CLICK IMAGE / TITLE */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: 150, objectFit: "cover" }}
        />

        <h3>{product.title}</h3>
        <p>₦{product.price}</p>
      </div>

      <button onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;