import mongoose from "mongoose";
import { AMUNITION_TYPE_RIFLE } from "./amunitionTypes";

export const AMUNITION_AK_47 = mongoose.Types.ObjectId();

export default [
  {
    _id: AMUNITION_AK_47,
    name: "AK-47",
    img: "[amunition-ak-47]",
    props: {
      distance: 5,
      damage: 1,
      defence: 0,
      accuracy: 0.5,
      speed: 0
    },
    cost: 1,
    amunitionType: AMUNITION_TYPE_RIFLE
  }
];
