import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart(state, action) {
      state.products = action.payload;
    },
  },
});

const cartPersistConfig = {
  key: "cart",
  storage,
};

const cartReducer = persistReducer(cartPersistConfig, cartSlice.reducer);

export const { addToCart } = cartSlice.actions;
export default cartReducer;
