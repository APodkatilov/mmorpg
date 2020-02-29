import { LOGOUT } from './constants';

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
