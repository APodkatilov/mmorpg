import { BattleEvents } from '../../core/gameEventTypes';

// eslint-disable-next-line max-len
const battleCreateMessage = (battle) => ({ event: BattleEvents.BattleCreate, data: { battle: battle.toObject() } });

// eslint-disable-next-line max-len
const battleConnectMessage = (battle, team, player) => ({ event: BattleEvents.BattleConnect, data: { battle: battle.toObject(), team: team.toObject(), player: player.toObject() } });

// eslint-disable-next-line max-len
const battleStartMessage = (battle) => ({ event: BattleEvents.BattleStart, data: { battle: battle.toObject() } });

export { battleCreateMessage, battleConnectMessage, battleStartMessage };
