import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div>
      <h1>E-Commerce</h1>

      <button
        onClick={() =>
          dispatch(addToCart({ id: 1, title: "Test Product", price: 1000 }))
        }
      >
        Add to Cart
      </button>

      <h2>Cart Items:</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          {item.title} - Qty: {item.quantity}
        </div>
      ))}
    </div>
  );
}

export default App;