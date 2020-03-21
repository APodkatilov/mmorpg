import users from './users';
import amunitionTypes from './amunitionTypes';
import amunitions from './amunitions';
import battleActions from './battleActions';
import battleMapSizeTypes from './battleMapSizeTypes';
import battleMapTypes from './battleMapTypes';
import battleMoves from './battleMoves';
import battles from './battles';
import messages from './messages';
import players from './players';
import teams from './teams';
import tiles from './tiles';
import tileTypes from './tileTypes';
import userSessions from './userSessions';
import battleMaps from './battleMaps';

const data = [
  {
    model: 'User',
    documents: users,
  },
  {
    model: 'AmunitionType',
    documents: amunitionTypes,
  },
  {
    model: 'Amunition',
    documents: amunitions,
  },
  {
    model: 'BattleAction',
    documents: battleActions,
  },
  {
    model: 'BattleMapSizeType',
    documents: battleMapSizeTypes,
  },
  {
    model: 'BattleMapType',
    documents: battleMapTypes,
  },
  {
    model: 'BattleMove',
    documents: battleMoves,
  },
  {
    model: 'Battle',
    documents: battles,
  },
  {
    model: 'Message',
    documents: messages,
  },
  {
    model: 'Player',
    documents: players,
  },
  {
    model: 'Team',
    documents: teams,
  },
  {
    model: 'Tile',
    documents: tiles,
  },
  {
    model: 'TileType',
    documents: tileTypes,
  },
  {
    model: 'UserSession',
    documents: userSessions,
  },
  {
    model: 'BattleMap',
    documents: battleMaps,
  },
];

export default data;
