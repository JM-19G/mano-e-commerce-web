import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Cart</h1>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <h3>{item.title}</h3>
          <p>₦{item.price}</p>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: Number(e.target.value),
                })
              )
            }
          />

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₦{total}</h2>
    </div>
  );
}

export default Cart;