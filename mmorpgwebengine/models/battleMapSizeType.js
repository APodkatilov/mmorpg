import mongoose from "mongoose";
import battleMapSizeTypeSchema from "../schemas/BattleMapSizeTypes";

module.exports = mongoose.model("BattleMapSizeType", battleMapSizeTypeSchema);
