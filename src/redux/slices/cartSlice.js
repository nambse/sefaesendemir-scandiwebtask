import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const {
        id,
        gallery,
        brand,
        name,
        prices,
        attributes,
        currentProducts,
        currentAttributes,
      } = action.payload;
      let counter = 0;

      if (attributes.length === currentAttributes.length) {
        currentProducts.some((currentProduct) => currentProduct.id === id)
          ? currentProducts.forEach((currentProduct, index) => {
              if (currentProduct.id === id) {
                if (
                  JSON.stringify(
                    [...currentProduct.currentAttributes].sort((a, b) =>
                      Object.keys(a)[0].localeCompare(Object.keys(b)[0])
                    )
                  ).slice(0, -3) ===
                  JSON.stringify(
                    [...currentAttributes].sort((a, b) =>
                      Object.keys(a)[0].localeCompare(Object.keys(b)[0])
                    )
                  ).slice(0, -3)
                ) {
                  currentProducts.splice(index, 1, {
                    ...currentProducts[index],
                    quantity: currentProducts[index].quantity + 1,
                  });
                } else {
                  counter++;
                }
              }
            })
          : currentProducts.push({
              id: id,
              brand: brand,
              name: name,
              attributes: attributes,
              currentAttributes: currentAttributes,
              prices: prices,
              gallery: gallery,
              quantity: 1,
            });

        const productsIdUnique = [];
        currentProducts.forEach(
          (currentProduct) =>
            currentProduct.id === id && productsIdUnique.push(currentProduct.id)
        );

        counter === productsIdUnique.length &&
          currentProducts.push({
            id: id,
            brand: brand,
            name: name,
            attributes: attributes,
            currentAttributes: currentAttributes,
            prices: prices,
            gallery: gallery,
            quantity: 1,
          });

        state.products = currentProducts;
      }
    },
    handleCartQuantity(state, action) {
      const { id, currentAttributes, operator } = action.payload;
      console.log(action.payload.currentAttributes);
      state.products.forEach((product) => {
        if (product.id === id) {
          if (
            JSON.stringify(
              [...product.currentAttributes].sort((a, b) =>
                Object.keys(a)[0].localeCompare(Object.keys(b)[0])
              )
            ).slice(0, -3) ===
            JSON.stringify(
              [...currentAttributes].sort((a, b) =>
                Object.keys(a)[0].localeCompare(Object.keys(b)[0])
              )
            ).slice(0, -3)
          ) {
            if (operator === "increment") {
              product.quantity = product.quantity + 1;
            } else if (operator === "decrement") {
              if (product.quantity > 1) {
                product.quantity = product.quantity - 1;
              } else {
                state.products.splice(state.products.indexOf(product), 1);
              }
            }
          }
        }
      });
    },
  },
});

const cartPersistConfig = {
  key: "cart",
  storage,
};

const cartReducer = persistReducer(cartPersistConfig, cartSlice.reducer);

export const { addToCart, handleCartQuantity } = cartSlice.actions;
export default cartReducer;
