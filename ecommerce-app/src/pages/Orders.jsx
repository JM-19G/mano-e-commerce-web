import PageWrapper from "../components/PageWrapper";
import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector((state) => state.cart.orders);

  return (
    <PageWrapper>
      <div style={styles.container}>
        <h1>📦 Orders</h1>

        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <p><b>ID:</b> {order.id}</p>
            <p><b>Total:</b> ₦{order.total}</p>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.title} x {item.quantity}
              </p>
            ))}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

const styles = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    background: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 12,
  },
  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
};

export default Orders;