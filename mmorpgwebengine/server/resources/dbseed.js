import data from "../../db";

const models = [
  "User",
  "AmunitionType",
  "Amunition",
  "BattleAction",
  "BattleMapSizeType",
  "BattleMapType",
  "BattleMove",
  "Battle",
  "Message",
  "Player",
  "Team",
  "Tile",
  "TileType",
  "UserSession",
  "BattleMap"
];

const modelPaths = models.map(m => `models/${m.toLowerCase()}.js`);

export default { data, models, modelPaths };
