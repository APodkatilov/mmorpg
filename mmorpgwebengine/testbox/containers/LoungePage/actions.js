import {
  API_GET_BATTLES, API_GET_BATTLES_OK, API_GET_BATTLES_FAIL, API_CREATE_BATTLE, API_CREATE_BATTLE_OK,
  API_CREATE_BATTLE_FAIL, API_CONNECT_BATTLE, API_CONNECT_BATTL_OK, API_CONNECT_BATTLE_FAIL,
  API_GET_BATTLE_TEAMS, API_GET_BATTLE_TEAMS_OK, API_GET_BATTLE_TEAMS_FAIL,
} from './constants';

function getBattles() {
  return {
    type: API_GET_BATTLES,
  };
}

function getBattlesOk(battles) {
  return {
    type: API_GET_BATTLES_OK,
    payload: battles,
  };
}

function getBattlesFail(error) {
  return {
    type: API_GET_BATTLES_FAIL,
    payload: error,
  };
}

function createBattle() {
  return {
    type: API_CREATE_BATTLE,
  };
}

function createBattleOk(battle) {
  return {
    type: API_CREATE_BATTLE_OK,
    payload: battle,
  };
}

function createBattleFail(error) {
  return {
    type: API_CREATE_BATTLE_FAIL,
    payload: error,
  };
}

function connectBattle(battleId) {
  return {
    type: API_CONNECT_BATTLE,
    payload: battleId,
  };
}

function connectBattleOk(battle) {
  return {
    type: API_CONNECT_BATTL_OK,
    payload: battle,
  };
}

function connectBattleFail(error) {
  return {
    type: API_CONNECT_BATTLE_FAIL,
    payload: error,
  };
}

function getBattleTeams(battleId) {
  return {
    type: API_GET_BATTLE_TEAMS,
    payload: battleId,
  };
}

function getBattleTeamsOk(teams) {
  return {
    type: API_GET_BATTLE_TEAMS_OK,
    payload: teams,
  };
}

function getBattleTeamsFail(error) {
  return {
    type: API_GET_BATTLE_TEAMS_FAIL,
    payload: error,
  };
}

export {
  getBattles,
  getBattlesOk,
  getBattlesFail,
  createBattle,
  createBattleOk,
  createBattleFail,
  connectBattle,
  connectBattleOk,
  connectBattleFail,
  getBattleTeams,
  getBattleTeamsOk,
  getBattleTeamsFail,
};
