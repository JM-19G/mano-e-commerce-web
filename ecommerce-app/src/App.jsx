import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();

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
    </div>
  );
}

export default App;