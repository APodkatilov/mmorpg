import { PlayerEvents } from '../../core/gameEventTypes';

// eslint-disable-next-line max-len
const playerConnectMessage = (player) => ({ event: PlayerEvents.PlayerConnect, data: { player: player.toObject() } });

// eslint-disable-next-line max-len
const playerLeaveMessage = (player) => ({ event: PlayerEvents.PlayerLeave, data: { player: player.toObject() } });

export { playerConnectMessage, playerLeaveMessage };
