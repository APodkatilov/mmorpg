import mongoose from 'mongoose';

export const USER_TEST_USER_1 = mongoose.Types.ObjectId();
export const USER_TEST_USER_2 = mongoose.Types.ObjectId();

export default [
  {
    _id: USER_TEST_USER_1,
    nickname: 'jo',
    email: 'jo@jo.com',
    passwordHash: '123',
    salt: '1111',
  },
  {
    _id: USER_TEST_USER_2,
    nickname: 'bo',
    email: 'bo@bo.com',
    passwordHash: '123',
    salt: '1111',
  },
];
