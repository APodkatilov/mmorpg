import mongoose from "mongoose";

import { BATTLE_MAP_TYPE_SANDOX } from "./battleMapTypes";
import { TILE_SIMPLE_ROAD_TILE } from "./tiles";

export default [
  {
    name: "SimpleSandboxMap",
    battleMapType: BATTLE_MAP_TYPE_SANDOX,
    tiles: [
      TILE_SIMPLE_ROAD_TILE,
      TILE_SIMPLE_ROAD_TILE,
      TILE_SIMPLE_ROAD_TILE,
      TILE_SIMPLE_ROAD_TILE
    ]
  }
];
