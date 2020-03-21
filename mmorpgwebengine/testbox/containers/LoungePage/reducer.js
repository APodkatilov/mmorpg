import produce from 'immer';
import {
  API_GET_BATTLES, API_GET_BATTLES_OK, API_GET_BATTLES_FAIL,
  API_CREATE_BATTLE, API_CREATE_BATTLE_OK, API_CREATE_BATTLE_FAIL,
  API_CONNECT_BATTLE, API_CONNECT_BATTL_OK, API_CONNECT_BATTLE_FAIL,
  API_GET_BATTLE_TEAMS, API_GET_BATTLE_TEAMS_OK, API_GET_BATTLE_TEAMS_FAIL,
} from './constants';
import { WS_PLAYER_CONNECT, WS_PLAYER_LEAVE } from '../SocketProvider/constants';

export const initialState = {
  activePlayers: [],
  activeBattles: {
    loading: false,
    error: null,
    data: null,
  },
  currentBattle: {
    loading: false,
    error: null,
    data: null,
  },
  currentBattleTeams: {
    loading: false,
    error: null,
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loungePageReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case WS_PLAYER_CONNECT: {
      const { player } = action.payload;
      // eslint-disable-next-line no-underscore-dangle
      if (!draft.activePlayers.some((p) => p._id === player._id)) {
        draft.activePlayers.push(action.payload.player);
      }
      return draft;
    }
    case WS_PLAYER_LEAVE: {
      const { player } = action.payload;
      // eslint-disable-next-line no-underscore-dangle
      draft.activePlayers = draft.activePlayers.filter((p) => p._id !== player._id);
      return draft;
    }
    case API_GET_BATTLES: {
      draft.activeBattles.loading = true;
      draft.activeBattles.error = null;
      draft.activeBattles.data = null;
      return draft;
    }
    case API_GET_BATTLES_OK: {
      const { battles } = action.payload;
      draft.activeBattles.loading = false;
      draft.activeBattles.data = battles;
      return draft;
    }
    case API_GET_BATTLES_FAIL: {
      const { error } = action.payload;
      draft.activeBattles.loading = false;
      draft.activeBattles.error = error;
      draft.activeBattles.data = null;
      return draft;
    }
    case API_CREATE_BATTLE: {
      draft.currentBattle.loading = true;
      draft.currentBattle.error = null;
      draft.currentBattle.data = null;
      return draft;
    }
    case API_CREATE_BATTLE_OK: {
      const { battle } = action.payload;
      draft.currentBattle.loading = false;
      draft.currentBattle.data = battle;
      return draft;
    }
    case API_CREATE_BATTLE_FAIL: {
      const { error } = action.payload;
      draft.currentBattle.loading = false;
      draft.currentBattle.error = error;
      draft.currentBattle.data = null;
      return draft;
    }
    case API_GET_BATTLE_TEAMS: {
      draft.currentBattleTeams.loading = true;
      draft.currentBattleTeams.error = null;
      draft.currentBattleTeams.data = null;
      return draft;
    }
    case API_GET_BATTLE_TEAMS_OK: {
      const { teams } = action.payload;
      draft.currentBattleTeams.loading = false;
      draft.currentBattleTeams.data = teams;
      return draft;
    }
    case API_GET_BATTLE_TEAMS_FAIL: {
      const { error } = action.payload;
      draft.currentBattleTeams.loading = false;
      draft.currentBattleTeams.error = error;
      draft.currentBattleTeams.data = null;
      return draft;
    }
  }
});

export default loungePageReducer;
