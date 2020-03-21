import mongoose from 'mongoose';

export const BATTLE_MAP_SIZE_TYPE_EXTRA_TINY = mongoose.Types.ObjectId();
export const BATTLE_MAP_SIZE_TYPE_TINY = mongoose.Types.ObjectId();

export default [
  {
    _id: BATTLE_MAP_SIZE_TYPE_EXTRA_TINY,
    name: 'ExtraTiny',
    width: 2,
    height: 2,
  },
  {
    _id: BATTLE_MAP_SIZE_TYPE_TINY,
    name: 'Tiny',
    width: 5,
    height: 5,
  },
];
