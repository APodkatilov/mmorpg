import express from 'express';
import * as resourceHanlder from '../handlers/resource.handler';

const router = express.Router();

router.get('/amunition/types', resourceHanlder.amunitionTypes);
router.get('/amunition/:typeId', resourceHanlder.amunitionByType);
router.get('/battleMap/sizeTypes', resourceHanlder.battleMapSizeTypes);
router.get('/battleMap/types/:sizeId', resourceHanlder.battleMapTypesBySize);
router.get('/battleMap/:typeId', resourceHanlder.battleMapByType);
router.get('/tile/types', resourceHanlder.tileTypes);
router.get('/tile/:tileId', resourceHanlder.tileByTileId);

export default router;
