import PageWrapper from "../components/PageWrapper";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  checkout,
  clearCoupon,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import { useToast } from "../hooks/useToast.js";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.cart.orders);
  const coupon = useSelector((state) => state.cart.coupon);
  const { toast } = useToast();

  const naira = "\u20A6";
  const [couponInput, setCouponInput] = useState("");

  const lastOrdersLenRef = useRef(orders.length);

  useEffect(() => {
    if (orders.length > lastOrdersLenRef.current) {
      toast("Order placed successfully", { type: "success" });
    }
    lastOrdersLenRef.current = orders.length;
  }, [orders.length]);

  const { subtotal, discount, total } = useMemo(() => {
    const subtotalValue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discountValue = 0;
    if (coupon) {
      if (coupon.type === "percent") {
        discountValue = (subtotalValue * coupon.value) / 100;
      } else {
        discountValue = coupon.value;
      }
    }

    return {
      subtotal: subtotalValue,
      discount: discountValue,
      total: Math.max(0, subtotalValue - discountValue),
    };
  }, [items, coupon]);

  return (
    <PageWrapper>
      <div style={styles.container}>
        <h1>🛒 Cart</h1>

        <div style={styles.grid}>
          {/* ITEMS */}
          <div>
            {items.length === 0 && <p>Cart is empty</p>}

            {items.map((item) => (
              <div key={item.id} style={styles.card}>
                <h3>{item.title}</h3>
                <p>
                  {naira}
                  {item.price}
                </p>

                <div style={{ display: "flex", gap: 10 }}>
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

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div style={styles.summary}>
            <h2>Summary</h2>

            <p>Subtotal: ₦{subtotal}</p>
            <p>Discount: ₦{discount}</p>
            <h3>Total: ₦{total}</h3>

            <input
              placeholder="Coupon"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              style={styles.input}
            />

            <button onClick={() => dispatch(applyCoupon(couponInput))}>
              Apply
            </button>

            <button onClick={() => dispatch(clearCoupon())}>
              Clear
            </button>

            <button onClick={() => dispatch(checkout())}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",

    // ✅ GLASS EFFECT (instead of solid white)
    background: "rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.75)",

    padding: 20,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20,
  },

  card: {
    // ✅ ITEM CARD GLASS
    background: "rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.75)",

    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    border: "1px solid rgba(255,255,255,0.2)",
  },

  summary: {
    // ✅ SUMMARY GLASS
    background: "rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.75)",

    padding: 15,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
  },

  input: {
    width: "93%",
    padding: 10,
    marginBottom: 10,
  },
};

export default Cart;