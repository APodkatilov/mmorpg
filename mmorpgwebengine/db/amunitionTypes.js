import mongoose from 'mongoose';

export const AMUNITION_TYPE_RIFLE = mongoose.Types.ObjectId();

export default [
  {
    _id: AMUNITION_TYPE_RIFLE,
    name: 'Rifle',
    img: '[amunition_type-rifle]',
  },
];
