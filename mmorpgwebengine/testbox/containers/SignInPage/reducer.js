import produce from 'immer';
import { SIGNIN_REQUEST, SIGNIN_OK, SIGNIN_FAILED } from './constants';

export const initialState = {
  error: null,
  token: null,
};

/* eslint-disable default-case, no-param-reassign, no-unused-vars */
const signInReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      draft.token = null;
      draft.error = null;
      break;
    case SIGNIN_OK:
      draft.token = action.payload.token;
      draft.error = null;
      break;
    case SIGNIN_FAILED:
      draft.token = null;
      draft.error = action.payload.error;
      break;
  }
});

export default signInReducer;
