import { body } from 'express-validator';

const signInValidationRules = () => [
  body('login')
    .not()
    .isEmpty(),
  body('password')
    .not()
    .isEmpty(),
];

const signOnValidationRules = () => [
  body('nickname')
    .not()
    .isEmpty()
    .trim(),
  body('email').isEmail(),
  body('password')
    .not()
    .isEmpty(),
];

export { signOnValidationRules, signInValidationRules };
