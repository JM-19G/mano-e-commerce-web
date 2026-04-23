import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const state = localStorage.getItem("cartState");
    return state ? JSON.parse(state) : undefined;
  } catch (error) {
    void error;
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("cartState", JSON.stringify(state));
  } catch (error) {
    void error;
  }
};

const normalizeCouponCode = (code) => String(code || "").trim().toUpperCase();

const getCoupon = (rawCode) => {
  const code = normalizeCouponCode(rawCode);

  // Add more promo codes here (frontend-only demo).
  switch (code) {
    case "MANO10":
      return { code, type: "percent", value: 10, label: "10% off" };
    case "WELCOME5":
      return { code, type: "amount", value: 5000, label: "₦5,000 off" };
    default:
      return null;
  }
};

const calculateDiscount = (subtotal, coupon) => {
  if (!coupon) return 0;
  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0;

  if (coupon.type === "percent") {
    const percent = Number(coupon.value) || 0;
    return Math.round((subtotal * percent) / 100);
  }

  if (coupon.type === "amount") {
    const amount = Number(coupon.value) || 0;
    return amount;
  }

  return 0;
};

const initialState =
  loadState() || {
    items: [],
    orders: [],
    coupon: null,
    couponError: null,
  };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      saveState(state);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);

      saveState(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;

      saveState(state);
    },

    applyCoupon: (state, action) => {
      const coupon = getCoupon(action.payload);
      if (!coupon) {
        state.coupon = null;
        state.couponError = "Invalid coupon code";
        saveState(state);
        return;
      }

      state.coupon = coupon;
      state.couponError = null;
      saveState(state);
    },

    clearCoupon: (state) => {
      state.coupon = null;
      state.couponError = null;
      saveState(state);
    },

    checkout: (state) => {
      if (state.items.length === 0) return;

      const subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discount = calculateDiscount(subtotal, state.coupon);
      const total = Math.max(0, subtotal - Math.min(discount, subtotal));

      state.orders.push({
        id: Date.now(),
        items: state.items,
        subtotal,
        discount,
        coupon: state.coupon?.code || null,
        total,
      });

      state.items = [];
      state.coupon = null;
      state.couponError = null;
      saveState(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCoupon,
  checkout,
} = cartSlice.actions;

export default cartSlice.reducer;
