import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orders: [],
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
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;
    },

    checkout: (state) => {
      if (state.items.length === 0) return;

      state.orders.push({
        id: Date.now(),
        items: state.items,
        total: state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      });

      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  checkout,
} = cartSlice.actions;

export default cartSlice.reducer;