import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/cart/cartSlice";
import ProductCard from "./components/ProductCard";
import products from "./data/products";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌾 Agro Market</h1>

      <h2>Cart: {cartItems.length}</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={(item) => dispatch(addToCart(item))}
          />
        ))}
      </div>
    </div>
  );
}

export default App;