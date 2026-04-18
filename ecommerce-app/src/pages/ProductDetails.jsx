import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import products from "../data/products";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ padding: 20 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: 300, height: 300, objectFit: "cover" }}
      />

      <h1>{product.title}</h1>
      <h2>₦{product.price}</h2>
      <p>{product.category}</p>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;