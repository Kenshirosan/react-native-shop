import { setAlert } from './alert';
import {
  GET_CART,
  ADD_TO_CART,
  GET_CART_COUNT,
  UPDATE_QTY,
  REMOVE_ITEM,
} from './types';

export const getCart = () => async dispatch => {
  try {
    dispatch({
      type: GET_CART,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCartCount = () => async dispatch => {
  dispatch({
    type: GET_CART_COUNT,
  });
};

export const addToCart = product => async (dispatch, state) => {
  try {
    if (!product.qty) {
      product.qty = 1;
    }

    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });

    dispatch(setAlert('Produit ajouté au panier', 'success'));
  } catch (e) {
    console.log(e);
  }
};

export const updateQty = formData => async dispatch => {
  try {
    dispatch({
      type: UPDATE_QTY,
      payload: formData,
    });

    dispatch(setAlert('Qty mis à jour !', 'success'));
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });

    dispatch(setAlert('Produit retire du panier !', 'success'));
  } catch (e) {
    console.log(e);
  }
};

export const updateCart = formData => async dispatch => {
  try {
    dispatch(setAlert('Panier mis à jour !', 'success'));
  } catch (e) {
    console.log(e);
  }
};

export const destroyCart = formData => async dispatch => {
  try {
    dispatch(setAlert('Votre panier est vide !', 'success'));
  } catch (e) {
    console.log(e);
  }
};
