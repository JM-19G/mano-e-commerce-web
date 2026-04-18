function ProductCard({ product, onAdd }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 10, margin: 10, width: 220 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: 150, objectFit: "cover" }}
      />

      <h3>{product.title}</h3>
      <p>₦{product.price}</p>
      <p style={{ fontSize: 12 }}>{product.category}</p>

      <button onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;