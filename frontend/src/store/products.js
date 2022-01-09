import { csrfFetch } from "./csrf";

// Action type constants
const READ_PRODUCTS = 'products/READ_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT';

// Action creators
export const readProducts = (products) => {
  return {
    type: READ_PRODUCTS,
    products
  };
}

export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  };
}

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id
  };
}

// Thunk action creators
export const getAllProducts = () => async (dispatch) => {
  const response = await csrfFetch('/api/products');
  const data = await response.json();
  dispatch(readProducts(data.products));
}

export const submitProduct = (product) => async (dispatch) => {
  const { userId, title, description, imageSrc } = product;
  const response = await csrfFetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      title,
      description,
      imageSrc
    })
  });
  const data = await response.json();
  dispatch(createProduct(data.product))
  return response;
}

export const removeProduct = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(deleteProduct(id));
  return response;
}


const initialState = { entries: [] }

const productsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case READ_PRODUCTS:
      newState = { ...state };
      newState.entries = [...action.products];
      return newState;
    case CREATE_PRODUCT:
      newState = { ...state };
      newState.entries = [action.product, ...newState.entries]
      return newState;
    case DELETE_PRODUCT:
      newState = { ...state };
      return newState;
    default:
      return state;
  }
}

export default productsReducer;
