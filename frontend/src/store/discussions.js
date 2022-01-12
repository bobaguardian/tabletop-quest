import { csrfFetch } from "./csrf";

// Action type constants
const READ_DISCUSSIONS = 'discussions/READ_DISCUSSIONS';
const CREATE_DISCUSSION = 'discussions/CREATE_DISCUSSION';
const UPDATE_DISCUSSION = 'discussions/UPDATE_DISCUSSION';
const DELETE_DISCUSSION = 'discussions/DELETE_DISCUSSION';

// Action creators
export const readDiscussions = (discussions, productId) => {
  return {
    type: READ_DISCUSSIONS,
    discussions,
    productId
  };
}

export const createDiscussion = (discussion) => {
  return {
    type: CREATE_DISCUSSION,
    discussion
  };
}

export const updateDiscussion = (id, discussion) => {
  return {
    type: UPDATE_DISCUSSION,
    id,
    discussion
  };
}

export const deleteDiscussion = (id) => {
  return {
    type: DELETE_DISCUSSION,
    id
  };
}

// Thunk action creators
// READ
export const getDiscussionsForProduct = (productId) => async(dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}/discussions`);
  const data = await response.json();
  dispatch(readDiscussions(data.discussions, productId));
  return data;
}

const initialState = { entries: {} }

const discussionsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case READ_DISCUSSIONS:
      newState = {...state};
      newState.entries = action.discussions.reduce((entries, discussion) => {
        entries[discussion.id] = discussion;
        return entries;
      }, {});
      return newState;
    default:
      return state;
  }
}

export default discussionsReducer;
