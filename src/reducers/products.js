import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  FILTER_PRODUCT,
  FILTER_BY_PRICE,
} from '../actions/types';

/**
 *
 * @type {{product: {}, products: *[]}}
 */
const initialState = {
  products: [],
  filtered: [],
  product: {},
};

export default function products(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        filtered: payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        products: state.products,
        product: payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload.product],
      };

    case FILTER_PRODUCT:
      let prods = state.products;
      if (payload !== 'all') {
        prods = state.products.filter(p => p.category_id === payload);
      }
      return {
        ...state,
        filtered: prods,
      };

    case FILTER_BY_PRICE:
      if (!payload.max) {
        payload.max = 1000000;
      }

      return {
        ...state,
        filtered: state.products.filter(
          p => p.priceHT / 100 >= payload.min && p.priceHT / 100 < payload.max
        ),
      };
    default:
      return state;
  }
}
