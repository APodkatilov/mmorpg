import {
  LOGOUT, LOGIN,
} from './constants';

/**
 * logout
 *
 * @return {object}      An logout action object
 */
export function logout() {
  return {
    type: LOGOUT,
  };
}

/**
 * login
 * @param {string} token Token
 * @return {object}      An logout action object
 */
export function login(token) {
  return {
    type: LOGIN,
    payload: token,
  };
}
