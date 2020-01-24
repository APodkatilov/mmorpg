import { body } from 'express-validator';

const signInValidationRules = () => [
  body('Login')
    .not()
    .isEmpty(),
  body('Password')
    .not()
    .isEmpty(),
];

const signOnValidationRules = () => [
  body('Nickname')
    .not()
    .isEmpty()
    .trim(),
  body('Email').isEmail(),
  body('Password')
    .not()
    .isEmpty(),
];

export { signOnValidationRules, signInValidationRules };
