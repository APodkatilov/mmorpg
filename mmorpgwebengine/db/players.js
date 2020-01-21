import mongoose from "mongoose";
import { USER_TEST_USER_1, USER_TEST_USER_2 } from "./users";
import { AMUNITION_AK_47 } from "./amunitions";

export const PLAYER_1 = mongoose.Types.ObjectId();
export const PLAYER_2 = mongoose.Types.ObjectId();

export default [
  {
    _id: PLAYER_1,
    user: USER_TEST_USER_1,
    avatar: null,
    props: {
      stamina: 1.0,
      accuracy: 1.0,
      force: 1.0,
      dexterity: 1.0
    },
    stat: {
      level: 1,
      credit: 100,
      winBattles: 0,
      loseBattles: 0
    },
    battleState: {
      health: 10,
      mapPosX: 0,
      mapPosY: 0
    },
    amunitions: [mongoose.Types.ObjectId()]
  },
  {
    _id: PLAYER_2,
    user: USER_TEST_USER_2,
    avatar: null,
    props: {
      stamina: 1.0,
      accuracy: 1.0,
      force: 1.0,
      dexterity: 1.0
    },
    stat: {
      level: 1,
      credit: 100,
      winBattles: 0,
      loseBattles: 0
    },
    battleState: {
      health: 10,
      mapPosX: 0,
      mapPosY: 0
    },
    Amunitions: [AMUNITION_AK_47]
  }
];
