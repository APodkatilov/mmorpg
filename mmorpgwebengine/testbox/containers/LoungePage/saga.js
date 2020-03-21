import {
  put, call, takeLatest,
} from 'redux-saga/effects';

import {
  API_GET_BATTLES,
  API_CREATE_BATTLE,
  API_CONNECT_BATTLE,
  API_GET_BATTLE_TEAMS,
} from './constants';
import {
  getBattlesOk,
  getBattlesFail,
  createBattleOk,
  createBattleFail,
  connectBattleOk,
  connectBattleFail,
  getBattleTeamsOk,
  getBattleTeamsFail,
} from './actions';
import history from '../../utils/history';
import Settings from '../../settings';
import { serviceFactory } from '../../services/index';

// function replaceTo(location) {
//   history.replace(location);
// }

function* getBattlesEffect() {
  try {
    console.log('getBattlesEffect');
    const battles = yield call([serviceFactory.battleService, serviceFactory.battleService.getActives]);
    yield put(getBattlesOk(battles));
  } catch (error) {
    yield put(getBattlesFail(error));
  }
}

function* createBattleEffect() {
  try {
    const battle = yield call([serviceFactory.battleService, serviceFactory.battleService.create]);
    yield put(createBattleOk(battle));
  } catch (error) {
    yield put(createBattleFail(error));
  }
}

function* connectBattleEffect({ payload: battleId }) {
  try {
    const battle = yield call([serviceFactory.battleService, serviceFactory.battleService.connects], battleId);
    yield put(connectBattleOk(battle));
  } catch (error) {
    yield put(connectBattleFail(error));
  }
}

function* getBattleTeamsEffect(battleId) {
  try {
    const teams = yield call([serviceFactory.battleService, serviceFactory.battleService.getBattleTeams], battleId);
    yield put(getBattleTeamsOk(teams));
  } catch (error) {
    yield put(getBattleTeamsFail(error));
  }
}

export default function* pageSaga() {
  yield takeLatest(API_GET_BATTLES, getBattlesEffect);
  yield takeLatest(API_CREATE_BATTLE, createBattleEffect);
  yield takeLatest(API_CONNECT_BATTLE, connectBattleEffect);
  yield takeLatest(API_GET_BATTLE_TEAMS, getBattleTeamsEffect);
}
