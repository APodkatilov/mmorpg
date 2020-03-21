import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loungePage state domain
 */

const selectLoungePageDomain = (state) => state.loungePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoungePage
 */

const makeSelectLoungePage = () => createSelector(selectLoungePageDomain, (substate) => substate);

const makeSelectActivePlayers = () => createSelector(selectLoungePageDomain, (substate) => substate.activePlayers);

const makeSelectActiveBattles = () => createSelector(selectLoungePageDomain, (substate) => substate.activeBattles);


export default makeSelectLoungePage;
export { selectLoungePageDomain, makeSelectActivePlayers, makeSelectActiveBattles };
