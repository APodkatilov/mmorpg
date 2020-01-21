import mongoose from "mongoose";
import { BATTLE_MAP_SIZE_TYPE_EXTRA_TINY } from "./battleMapSizeTypes";

export const BATTLE_MAP_TYPE_SANDOX = mongoose.Types.ObjectId();

export default [
  {
    _id: BATTLE_MAP_TYPE_SANDOX,
    name: "Sandbox",
    teamCount: 2,
    teamPlayerCount: 1,
    battleMapSizeType: BATTLE_MAP_SIZE_TYPE_EXTRA_TINY
  }
];
