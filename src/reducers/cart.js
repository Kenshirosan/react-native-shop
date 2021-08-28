import {
  GET_CART,
  ADD_TO_CART,
  GET_CART_PRODUCTS,
  GET_CART_COUNT,
  UPDATE_QTY,
  REMOVE_ITEM,
} from "../actions/types";
import { getData, storeData } from "../utils/asyncStorage";

const cartContent = async () => await getData("cart");

/**
 *
 * @type {{cart: *[]}}
 */
const initialState = {
  cart: cartContent || [],
  products: cartContent || [],
  count: 0,
};

export default async function cart(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
      return state;

    case GET_CART_COUNT:
      let count = 0;
      state.products.forEach((prod) => (count += parseInt(prod.qty)));
      return {
        ...state,
        count: count,
      };

    case ADD_TO_CART:
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(payload);
      await storeData("cart", JSON.stringify(cart));
      return {
        ...state,
        cart: cart,
        products: cart,
      };

    case GET_CART_PRODUCTS:
      return {
        ...state,
        products: payload,
      };

    case UPDATE_QTY:
      const item = state.cart.find((item) => item.id === payload.id);
      item.qty = payload.qty;
      const newCart = state.products.map((p) => (p.id === item.id ? item : p));
      await storeData("cart", JSON.stringify(newCart));
      return {
        ...state,
        products: newCart,
      };

    case REMOVE_ITEM:
      const newProds = state.products.filter((p) => p.id !== payload);
      await storeData("cart", JSON.stringify(newProds));

      return {
        ...state,
        products: newProds,
        cart: newProds,
      };
    default:
      return state;
  }
}
