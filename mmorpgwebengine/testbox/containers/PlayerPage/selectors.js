import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the playerPage state domain
 */

const selectPlayerPageDomain = state => state.playerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PlayerPage
 */

const makeSelectPlayerPage = () =>
  createSelector(selectPlayerPageDomain, substate => substate);

export default makeSelectPlayerPage;
export { selectPlayerPageDomain };
