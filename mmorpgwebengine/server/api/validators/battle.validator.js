import { body, param } from 'express-validator';

const createNewValidationRules = () => [
  body('MapId')
    .not()
    .isEmpty(),
];

const connectValidationRules = () => [
  body('BattleId')
    .not()
    .isEmpty(),
  body('TeamId').not().isEmpty(),
];

const getTeamsValidationRules = () => [
  param('battleId')
    .not()
    .isEmpty(),
];

export { createNewValidationRules, connectValidationRules, getTeamsValidationRules };
