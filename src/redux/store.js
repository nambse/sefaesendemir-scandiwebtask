import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import currencyReducer from "./slices/currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
});

export const pStore = persistStore(store);
