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

// CREATE
export const submitDiscussion = (discussionDetails) => async(dispatch) => {
  const { userId, productId, discussion } = discussionDetails;
  const response = await csrfFetch('/api/discussions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      productId,
      discussion
    })
  });
  const data = await response.json();
  dispatch(createDiscussion(data.discussion));
  return response;
}

// UPDATE
export const editDiscussion = (id, discussionDetails) => async(dispatch) => {
  const {userId, productId, discussion} = discussionDetails;
  const response = await csrfFetch(`/api/discussions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      productId,
      discussion
    })
  });
  const data = await response.json();
  dispatch(updateDiscussion(id, discussionDetails));
  return data;
}

// DELETE
export const removeDiscussion = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/discussions/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  dispatch(deleteDiscussion(id));
  return data;
}

const initialState = { entries: {} }

const discussionsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case READ_DISCUSSIONS:
      newState = { ...state };
      newState.entries = action.discussions.reduce((entries, discussion) => {
        entries[discussion.id] = discussion;
        return entries;
      }, {});
      return newState;
    case CREATE_DISCUSSION:
      newState = { ...state };
      newState.entries = {[action.discussion.id]: action.discussion, ...newState.entries};
      return newState;
    case UPDATE_DISCUSSION:
      newState = {
        ...state,
        entries: {[action.id]: action.discussion, ...state.entries}
      };
      return newState;
    case DELETE_DISCUSSION:
      newState = { ...state };
      delete newState.entries[action.id];
      newState.entries = {...newState.entries };
      return newState;
    default:
      return state;
  }
}

export default discussionsReducer;
