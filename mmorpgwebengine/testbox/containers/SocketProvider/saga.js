import {
  takeLatest, take, race, put, call,
} from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';

import {
  WS_INIT, WS_EVENT, WS_RECONNECT,
} from './constants';
import {
  LOGOUT, LOGIN,
} from '../App/constants';
import Settings from '../../settings';
import {
  wsEvent, wsReconnect, wsInit, wsPlayerConnect, wsPlayerLeave, wsBattleConnect, wsBattleCreate, wsBattleStart,
} from './actions';

function createSocketChannel(token) {
  const socket = new WebSocket(Settings.getWsUrl(token));

  return eventChannel((emit) => {
    const eventHandler = (event) => {
      emit(event);
    };

    const closeHandler = () => {
      emit(new Error('WS closed'));
    };

    // eslint-disable-next-line no-param-reassign
    socket.onopen = () => {
    };

    // eslint-disable-next-line no-param-reassign
    socket.onmessage = (event) => {
      eventHandler(JSON.parse(event.data));
    };

    // eslint-disable-next-line no-param-reassign
    socket.onerror = () => {
      closeHandler();
    };
    // eslint-disable-next-line no-param-reassign
    socket.onclose = () => {
      closeHandler();
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  });
}

function* wsResetEffect(channel, needClose) {
  if (needClose) {
    channel.close();
  }
  yield delay(2000);
  yield put(wsReconnect());
}
function* socketEffect({ payload: token }) {
  const wsToken = token || Settings.authToken;
  if (!wsToken) {
    return;
  }

  const channel = createSocketChannel(wsToken);

  try {
    while (true) {
      const { ws, stop } = yield race({ ws: take(channel), stop: take(LOGOUT) });

      if (stop) {
        yield* wsResetEffect(channel, true);
        return;
      }

      yield put(wsEvent(ws));
    }
  } catch (err) {
    yield* wsResetEffect(channel, false);
  }
}

function* wsEventEffect({ payload }) {
  console.log('wsEventEffect:');
  console.log(payload);
  const { event, data } = payload;
  switch (event) {
    case 'PlayerConnect':
      yield put(wsPlayerConnect(data));
      break;
    case 'PlayerLeave':
      yield put(wsPlayerLeave(data));
      break;
    case 'BattleCreate':
      yield put(wsBattleCreate(data));
      break;
    case 'BattleConnect':
      yield put(wsBattleConnect(data));
      break;
    case 'BattleStart':
      yield put(wsBattleStart(data));
      break;
    default:
  }
}

export default function* socketSaga() {
  yield takeLatest([WS_INIT, LOGIN], socketEffect);
  yield takeLatest(WS_EVENT, wsEventEffect);
  yield takeLatest(WS_RECONNECT, socketEffect);
  yield put(wsInit());
}
