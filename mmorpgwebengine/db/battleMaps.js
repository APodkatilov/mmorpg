import { BATTLE_MAP_TYPE_SANDOX } from './battleMapTypes';
import { TILE_SIMPLE_ROAD } from './tiles';

export default [
  {
    name: 'SimpleSandboxMap',
    battleMapType: BATTLE_MAP_TYPE_SANDOX,
    tiles: [
      TILE_SIMPLE_ROAD,
      TILE_SIMPLE_ROAD,
      TILE_SIMPLE_ROAD,
      TILE_SIMPLE_ROAD,
    ],
  },
];
