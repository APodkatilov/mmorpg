import mongoose from 'mongoose';
import { TILE_TYPE_ROAD } from './tileTypes';

export const TILE_SIMPLE_ROAD = mongoose.Types.ObjectId();

export default [
  {
    _id: TILE_SIMPLE_ROAD,
    img: 'tile/field/field_1',
    tileType: TILE_TYPE_ROAD,
  },
];
