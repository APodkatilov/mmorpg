import {
  SIGNIN_REQUEST, SIGNIN_OK, SIGNIN_FAILED,
} from './constants';


export function signIn(email, password) {
  return {
    type: SIGNIN_REQUEST,
    payload: { email, password },
  };
}
export function signInOk(token) {
  return {
    type: SIGNIN_OK,
    payload: { token },
  };
}

export function signInFailed(error) {
  return {
    type: SIGNIN_FAILED,
    payload: error,
  };
}
