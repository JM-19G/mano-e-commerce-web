import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const state = localStorage.getItem("wishlistState");
    return state ? JSON.parse(state) : undefined;
  } catch (error) {
    void error;
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("wishlistState", JSON.stringify(state));
  } catch (error) {
    void error;
  }
};

const initialState =
  loadState() || {
    items: [],
  };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
      saveState(state);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveState(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
