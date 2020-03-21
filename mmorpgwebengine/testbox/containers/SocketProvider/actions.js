import {
  WS_EVENT, WS_RECONNECT, WS_INIT, WS_PLAYER_CONNECT, WS_PLAYER_LEAVE, WS_BATTLE_CREATE, WS_BATTLE_CONNECT, WS_BATTLE_START,
} from './constants';


/**
 * wsInit
 * @return {object}  An wsInit action object
 */
export function wsInit() {
  return {
    type: WS_INIT,
  };
}


/**
 * wsEvent
 * @param {object} event Token
 * @return {object}      An wsEvent action object
 */
export function wsEvent(event) {
  return {
    type: WS_EVENT,
    payload: event,
  };
}

/**
 * wsReconnect
 * @return {object}      An wsReconnect action object
 */
export function wsReconnect() {
  return {
    type: WS_RECONNECT,
  };
}

/**
 * wsPlayerConnect
 * @param  {object}     data
 * @return {object}      An wsPlayerConnect action object
 */
export function wsPlayerConnect(data) {
  return {
    type: WS_PLAYER_CONNECT,
    payload: data,
  };
}

/**
 * wsPlayerLeave
 * @param  {object}     data
 * @return {object}      An wsPlayerConnect action object
 */
export function wsPlayerLeave(data) {
  return {
    type: WS_PLAYER_LEAVE,
    payload: data,
  };
}

/**
 * wsBattleCreate
 * @param  {object}     data
 * @return {object}      An wsBattleCreate action object
 */
export function wsBattleCreate(data) {
  return {
    type: WS_BATTLE_CREATE,
    payload: data,
  };
}

/**
 * wsBattleConnect
 * @param  {object}     data
 * @return {object}      An wsBattleConnect action object
 */
export function wsBattleConnect(data) {
  return {
    type: WS_BATTLE_CONNECT,
    payload: data,
  };
}

/**
 * wsBattleStart
 * @param  {object}     data
 * @return {object}      An wsBattleStart action object
 */
export function wsBattleStart(data) {
  return {
    type: WS_BATTLE_START,
    payload: data,
  };
}
