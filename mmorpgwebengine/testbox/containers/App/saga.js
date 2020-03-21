import {
  all, call, takeLatest,
} from 'redux-saga/effects';

import {
  LOGOUT,
} from './constants';
import history from '../../utils/history';
import Settings from '../../settings';
import socketSaga from '../SocketProvider/saga';

function replaceTo(location) {
  history.replace(location);
}
function* logoutEffect() {
  Settings.authToken = null;
  yield call(replaceTo, '/signin');
}

function* appSaga() {
  yield takeLatest(LOGOUT, logoutEffect);
}

export default function* compositeSaga() {
  yield all([
    appSaga(),
    socketSaga(),
  ]);
}
