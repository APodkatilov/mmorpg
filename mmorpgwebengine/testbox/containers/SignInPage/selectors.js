import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectSignInDomain = (state) => state.signIn || initialState;

const makeSelectSignIn = () => createSelector(selectSignInDomain, (substate) => substate);

const makeSelectSignInError = () => createSelector([selectSignInDomain, makeSelectSignIn()], (global, signInState) => signInState.error);

export default makeSelectSignIn;
export { selectSignInDomain, makeSelectSignInError };
