import { csrfFetch } from "./csrf";

// Action type constants
const READ_PRODUCTS = 'products/READ_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT';
const READ_ONE_PRODUCT = 'products/READ_ONE_PRODUCT';

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

export const updateProduct = (id, product) => {
  return {
    type: UPDATE_PRODUCT,
    id,
    product
  };
}

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id
  };

}
export const readOneProduct = (id) => {
  return {
    type: READ_ONE_PRODUCT,
    id
  };
}

// Thunk action creators
// READ
export const getAllProducts = () => async (dispatch) => {
  const response = await csrfFetch('/api/products');
  const data = await response.json();
  dispatch(readProducts(data.products));
}

// CREATE
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
  return data;
}

// DELETE
export const removeProduct = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(deleteProduct(id));
  return data;
}

// UPDATE
export const editProduct = (id, product) => async (dispatch) => {
  const { userId, title, imageSrc, description } = product;
  const response = await csrfFetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      title,
      imageSrc,
      description
    })
  });
  const data = await response.json();
  dispatch(updateProduct(id, product));
  return data;
}

export const getSingleProduct = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${id}`);
  const data = await response.json();
  return data;
}

export const readProductsSearch = (searchQuery) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/search/${searchQuery}`);
  const data = await response.json();
  dispatch(readProducts(data.products));
  return data;
}



const initialState = { entries: {} }

const productsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case READ_PRODUCTS:
      newState = { ...state };
      newState.entries = action.products.reduce((entries, product) => {
        entries[product.id] = product;
        return entries;
      }, {});
      return newState;
    case CREATE_PRODUCT:
      newState = { ...state };
      newState.entries = {[action.product.id]: action.product, ...newState.entries}
      return newState;
    case DELETE_PRODUCT:
      newState = { ...state };
      // need to delete, then reassign newState.entries to trigger change
      delete newState.entries[action.id];
      newState.entries = { ...newState.entries }
      return newState;
    case UPDATE_PRODUCT:
      newState = { ...state };
      newState.entries = { [action.id]: action.product, ...newState.entries};
      return newState;
    default:
      return state;
  }
}

export default productsReducer;
