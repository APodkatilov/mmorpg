import express from 'express';
import * as playerHandlder from '../handlers/player.handler';

const router = express.Router();

router.get('', playerHandlder.getCurrent);

export default router;
