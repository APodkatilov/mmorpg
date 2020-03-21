import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { SIGNIN_REQUEST } from './constants';
import { signInOk, signInFailed } from './actions';
import { serviceFactory } from '../../services/index';
import history from '../../utils/history';
import Settings from '../../settings';
import { login } from '../App/actions';

function forwardTo(location) {
  history.push(location);
}

function* authEffect({ payload: { email, password } }) {
  try {
    const authResult = yield call([serviceFactory.authService, serviceFactory.authService.auth], email, password);
    const { data: { data: { token } } } = authResult;
    yield put(signInOk(token));
    Settings.authToken = token;
    yield call(forwardTo, '/dashboard');
    yield put(login(token));
  } catch (err) {
    const { response } = err;
    if (response && response.status >= 400 && response.status <= 499 && response.data) {
      yield put(signInFailed(response.data));
    } else {
      yield put(signInFailed({ error: 'Unexpected error!' }));
    }
  }
}

export default function* signInSaga() {
  yield takeLatest(SIGNIN_REQUEST, authEffect);
}
