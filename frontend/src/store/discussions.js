import { csrfFetch } from "./csrf";

const initialState = { entries: {} }

const discussionsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    default:
      return state;
  }
}

export default discussionsReducer;
