
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

// Thunk action creators
export const getAllProducts = () => async (dispatch) => {
  const response = await fetch('/api/products');
  const data = await response.json();
  dispatch(readProducts(data.products));
}


// entries is an object of key (product Id) value (product) pairs
const initialState = { entries: [] }

const productsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case READ_PRODUCTS:
      newState = { ...state };
      // Normalizing array => object with reduce
      // newState.entries = action.products.reduce((entries, product) => {
      //   entries[product.id] = product;
      //   return entries;
      // }, {});
      newState.entries = [...action.products];

      return newState;
    default:
      return state;
  }
}

export default productsReducer;
