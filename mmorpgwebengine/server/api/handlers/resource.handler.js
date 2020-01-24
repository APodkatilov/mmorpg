import Amunition from '../../../models/amunition';
import AmunitionType from '../../../models/amunitionType';
import BattleMapSizeType from '../../../models/battleMapSizeType';
import BattleMapType from '../../../models/battleMapType';
import BattleMap from '../../../models/battleMap';
import Tile from '../../../models/tile';
import TileType from '../../../models/tileType';
import Response from '../response';

export const amunitionTypes = (req, res) => {
  AmunitionType.find({})
    .then((entities) => {
      res.status(200).json(
        new Response(
          true,
          entities.map((a) => a.toObject()),
        ).toObject(),
      );
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};

export const amunitionByType = (req, res) => {
  const { typeId } = req.params;

  Amunition.find({ amunitionType: typeId })
    .then((entities) => {
      res.status(200).json(
        new Response(
          true,
          entities.map((a) => a.toObject()),
        ).toObject(),
      );
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};

export const battleMapSizeTypes = (req, res) => {
  BattleMapSizeType.find()
    .then((entities) => {
      res.status(200).json(
        new Response(
          true,
          entities.map((a) => a.toObject()),
        ).toObject(),
      );
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};

export const battleMapTypesBySize = (req, res) => {
  const { sizeId } = req.params;
  BattleMapType.find({ battleMapSizeType: sizeId })
    .then((entities) => {
      res.status(200).json(
        new Response(
          true,
          entities.map((a) => a.toObject()),
        ).toObject(),
      );
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};

export const battleMapByType = (req, res) => {
  const { typeId } = req.params;
  BattleMap.find({ battleMapType: typeId })
    .then((entities) => {
      res.status(200).json(
        new Response(
          true,
          entities.map((a) => a.toObject()),
        ).toObject(),
      );
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};

export const tileByTileId = (req, res) => {
  const { tileId } = req.params;
  Tile.findById(tileId)
    .then((entity) => {
      res.status(200).json(new Response(true, entity.toObject()).toObject());
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};

export const tileTypes = (req, res) => {
  TileType.find()
    .then((entities) => {
      res.status(200).json(
        new Response(
          true,
          entities.map((a) => a.toObject()),
        ).toObject(),
      );
    })
    .catch((err) => res.status(400).json(new Response(false, null, err.message)));
};
