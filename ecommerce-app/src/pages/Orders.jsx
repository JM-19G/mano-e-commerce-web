import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector((state) => state.cart.orders);

  const naira = "\u20A6";
  const ordersIcon = "\uD83D\uDCE6";
  const times = "\u00D7";

  return (
    <div style={{ padding: 20, textAlign: "left" }}>
      <h1 style={{ textAlign: "center" }}>
        {ordersIcon} Order History
      </h1>

      {orders.length === 0 && <p style={{ textAlign: "center" }}>No orders yet</p>}

      {orders.map((order) => {
        const hasBreakdown =
          typeof order.subtotal === "number" || typeof order.discount === "number";

        return (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              marginBottom: 15,
              padding: 12,
              borderRadius: 8,
              background: "var(--surface)",
            }}
          >
            <p style={{ margin: "4px 0" }}>
              <b>Order ID:</b> {order.id}
            </p>

            {hasBreakdown && (
              <>
                <p style={{ margin: "4px 0" }}>
                  <b>Subtotal:</b> {naira}
                  {Number(order.subtotal || 0).toLocaleString()}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <b>Discount:</b> -{naira}
                  {Number(order.discount || 0).toLocaleString()}
                </p>
                {order.coupon && (
                  <p style={{ margin: "4px 0" }}>
                    <b>Coupon:</b> {order.coupon}
                  </p>
                )}
              </>
            )}

            <p style={{ margin: "6px 0" }}>
              <b>Total:</b> {naira}
              {Number(order.total || 0).toLocaleString()}
            </p>

            <h4 style={{ margin: "10px 0 6px" }}>Items:</h4>
            {order.items.map((item) => (
              <div key={item.id} style={{ margin: "2px 0" }}>
                {item.title} {times} {item.quantity}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
