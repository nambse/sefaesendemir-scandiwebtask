import { configureStore } from "@reduxjs/toolkit";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import currencyReducer from "./slices/currencySlice";



export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        cart: cartReducer,
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    ],
});

export const pStore = persistStore(store);
