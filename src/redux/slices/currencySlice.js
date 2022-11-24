import { createSlice } from "@reduxjs/toolkit";
import { persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currentCurrency: "",
    },
    reducers: {
        setCurrency(state, action) {
            state.currentCurrency = action.payload;
        }
    }
});

const currencyPersistConfig = {
    key: "currency",
    storage,
}

const currencyReducer = persistReducer(currencyPersistConfig, currencySlice.reducer);

export const {setCurrency} = currencySlice.actions;
export default currencyReducer;