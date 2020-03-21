import data from './data';

const models = [
  'User',
  'AmunitionType',
  'Amunition',
  'BattleAction',
  'BattleMap',
  'BattleMapSizeType',
  'BattleMapType',
  'BattleMove',
  'Battle',
  'Message',
  'Player',
  'Team',
  'Tile',
  'TileType',
  'UserSession',
];

const modelPaths = models.map((m) => `./server/models/${m.toLowerCase()}.js`);

export default { data, models, modelPaths };
