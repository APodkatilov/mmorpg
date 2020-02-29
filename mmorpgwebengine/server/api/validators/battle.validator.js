import { body, param } from 'express-validator';

const createNewValidationRules = () => [
  body('mapId')
    .not()
    .isEmpty(),
];

const connectValidationRules = () => [
  body('battleId')
    .not()
    .isEmpty(),
  body('teamId').not().isEmpty(),
];

const getTeamsValidationRules = () => [
  param('battleId')
    .not()
    .isEmpty(),
];

export { createNewValidationRules, connectValidationRules, getTeamsValidationRules };
