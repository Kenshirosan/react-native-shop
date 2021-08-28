import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  PRODUCT_ERROR,
  FILTER_PRODUCT,
  FILTER_BY_PRICE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { getData, storeData } from "../utils/asyncStorage";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e },
    });
  }
};
export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e },
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  try {
    // AJAX.
    // Asynchronous JavaScript And XML.
    // On envoie du JSON avec AJAX dans la majorité des cas.

    axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
    axios.defaults.headers.common["Accept"] = "application/json";

    const token = await getData("token");

    setAuthToken(token);

    const res = await axios.post("/api/products/create", formData);

    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("produit cree !", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e.message },
    });
  }
};

export const updateProduct = (formData) => async (dispatch) => {
  try {
    await axios.patch("/api/products/update", formData);

    dispatch(getProducts());

    dispatch(setAlert("produit a jour !", "success"));
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const destroyProduct = (formData) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/destroy`, { data: formData });

    dispatch(getProducts());

    dispatch(setAlert("Bye Bye product !", "success"));
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const filterProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_PRODUCT,
      payload: id,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const filterByPrice = (range) => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_BY_PRICE,
      payload: range,
    });
  } catch (e) {
    console.log(e.message);
  }
};
