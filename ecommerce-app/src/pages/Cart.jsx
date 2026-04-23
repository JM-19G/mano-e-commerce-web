import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  checkout,
  clearCoupon,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.cart.orders);
  const coupon = useSelector((state) => state.cart.coupon);
  const couponError = useSelector((state) => state.cart.couponError);

  const naira = "\u20A6";
  const cartIcon = "\uD83D\uDED2";
  const ordersIcon = "\uD83D\uDCE6";

  const [couponInput, setCouponInput] = useState("");

  const { subtotal, discount, total } = useMemo(() => {
    const subtotalValue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discountValue = 0;
    if (coupon) {
      if (coupon.type === "percent") {
        discountValue = Math.round(
          (subtotalValue * (Number(coupon.value) || 0)) / 100
        );
      } else if (coupon.type === "amount") {
        discountValue = Number(coupon.value) || 0;
      }
    }

    discountValue = Math.min(discountValue, subtotalValue);

    return {
      subtotal: subtotalValue,
      discount: discountValue,
      total: Math.max(0, subtotalValue - discountValue),
    };
  }, [items, coupon]);

  return (
    <div style={{ padding: 20 }}>
      <h1>
        {cartIcon} Cart
      </h1>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <h3 style={{ margin: "0 0 6px" }}>{item.title}</h3>
          <p style={{ margin: "0 0 10px" }}>
            {naira}
            {Number(item.price).toLocaleString()}
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
              style={{ width: 90, padding: 8 }}
            />

            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 20,
          padding: 15,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Summary</h2>
        <p style={{ margin: "6px 0" }}>
          Subtotal: {naira}
          {subtotal.toLocaleString()}
        </p>
        <p style={{ margin: "6px 0" }}>
          Discount: -{naira}
          {discount.toLocaleString()}
        </p>
        <h2 style={{ margin: "10px 0 0" }}>
          Total: {naira}
          {total.toLocaleString()}
        </h2>

        <div style={{ marginTop: 15 }}>
          <label style={{ display: "block", marginBottom: 6 }}>
            Coupon code (try <strong>MANO10</strong> or{" "}
            <strong>WELCOME5</strong>)
          </label>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon"
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
                flex: "1",
                minWidth: 220,
              }}
            />
            <button onClick={() => dispatch(applyCoupon(couponInput))}>
              Apply
            </button>
            <button
              onClick={() => {
                dispatch(clearCoupon());
                setCouponInput("");
              }}
            >
              Clear
            </button>
          </div>

          {coupon && (
            <p style={{ marginTop: 10, color: "#2e7d32" }}>
              Applied: <strong>{coupon.code}</strong> ({coupon.label})
            </p>
          )}

          {couponError && (
            <p style={{ marginTop: 10, color: "crimson" }}>{couponError}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => dispatch(checkout())}
        style={{ marginTop: 15, padding: "10px 14px" }}
      >
        Checkout
      </button>

      <hr />

      <h2>
        {ordersIcon} Orders (Preview)
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ padding: 10, borderBottom: "1px solid #eee" }}
        >
          <p style={{ margin: "4px 0" }}>Order ID: {order.id}</p>
          <p style={{ margin: "4px 0" }}>
            Total: {naira}
            {Number(order.total).toLocaleString()}
          </p>
          {order.coupon && (
            <p style={{ margin: "4px 0" }}>Coupon: {order.coupon}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Cart;
