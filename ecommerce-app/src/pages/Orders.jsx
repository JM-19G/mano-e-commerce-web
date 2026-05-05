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

    // ✅ GLASS CONTAINER
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    padding: 20,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
  },

  card: {
    // ✅ GLASS CARD
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    border: "1px solid rgba(255,255,255,0.2)",
  },
};

export default Orders;