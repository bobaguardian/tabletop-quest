import { csrfFetch } from './csrf'

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// action creators
export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
}

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  }
}

// thunk action for POST /api/session
export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}

// thunk action for GET /api/session to restore the session
// retain user info across a refresh
export const restore = () => async(dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
}

// thunk action for POST /api/users to sign up a user
export const signup = (user) => async(dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = { ...state };
      newState.user = null;
      return newState;
    default:
      return state;
  }

}

export default sessionReducer;
