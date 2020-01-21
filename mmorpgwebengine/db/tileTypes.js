import mongoose from "mongoose";

export const TILE_TYPE_ROAD = mongoose.Types.ObjectId();
export const TILE_TYPE_RIVER = mongoose.Types.ObjectId();

export default [
  {
    _id: TILE_TYPE_ROAD,
    name: "Road",
    props: {
      canWalk: true,
      canDrive: true,
      canFire: true,
      damage: 0,
      impedance: 0,
      acceleration: 10
    }
  },
  {
    _id: TILE_TYPE_RIVER,
    name: "River",
    props: {
      canWalk: false,
      canDrive: false,
      canFire: true,
      damage: 0,
      impedance: 0,
      acceleration: 0
    }
  }
];
