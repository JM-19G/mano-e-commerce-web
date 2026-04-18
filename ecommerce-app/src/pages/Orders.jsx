import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector((state) => state.cart.orders);

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Order History</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ border: "1px solid #ddd", marginBottom: 15, padding: 10 }}
        >
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Total:</b> ₦{order.total}</p>

          <h4>Items:</h4>
          {order.items.map((item) => (
            <div key={item.id}>
              {item.title} × {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;