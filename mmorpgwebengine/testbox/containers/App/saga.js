import {
  call, takeLatest,
} from 'redux-saga/effects';
import { LOGOUT } from './constants';
import history from '../../utils/history';
import Settings from '../../settings';

function replaceTo(location) {
  history.replace(location);
}
function* logoutEffect() {
  Settings.authToken = null;
  yield call(replaceTo, '/signin');
}

export default function* appSaga() {
  yield takeLatest(LOGOUT, logoutEffect);
}
