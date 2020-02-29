import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the battlePage state domain
 */

const selectBattlePageDomain = state => state.battlePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BattlePage
 */

const makeSelectBattlePage = () =>
  createSelector(selectBattlePageDomain, substate => substate);

export default makeSelectBattlePage;
export { selectBattlePageDomain };
