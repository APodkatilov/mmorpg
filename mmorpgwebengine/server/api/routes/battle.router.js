import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  createNewValidationRules,
  connectValidationRules,
  getTeamsValidationRules,
} from '../validators/battle.validator';
import * as battleHandler from '../handlers/battle.handler';

const router = express.Router();

router.post('/create', createNewValidationRules(), validationMiddleware, battleHandler.create);
router.post('/connect', connectValidationRules(), validationMiddleware, battleHandler.connect);
router.get('/active', battleHandler.getActive);
router.get('/:battleId/teams', getTeamsValidationRules(), validationMiddleware, battleHandler.getTeams);

export default router;
