import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import currencyReducer from "./slices/currencySlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
  //https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const pStore = persistStore(store);
