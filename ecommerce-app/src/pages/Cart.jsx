import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  checkout,
} from "../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.cart.orders);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Cart</h1>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div key={item.id}>
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

      <button onClick={() => dispatch(checkout())}>
        Checkout
      </button>

      <hr />

      <h2>📦 Orders (Preview)</h2>

      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Total: ₦{order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;