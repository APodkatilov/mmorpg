import mongoose from 'mongoose';
import Battle from '../../../models/battle';
import Response from '../response';
import BattleEventManager, { BattleEvents } from '../../core/playerGameContext';


export const create = (req, res) => {
  const { MapId: mapId } = req.body;
  const { context } = req;

  Battle.createNew(context.player, mapId)
    .then((battle) => {
      // eslint-disable-next-line no-underscore-dangle
      BattleEventManager.signalCreateBattle(battle._id);
      return mongoose.Promise.resolve(battle);
    })
    .then((battle) => {
      res.status(200).json(
        new Response(true, battle.toObject()).toObject(),
      );
    }).catch((err) => res
      .status(400)
      .json(
        new Response(false, null, `Ошибка регистрации битвы (${err.message})`),
      ));
};

export const connect = (req, res) => {
  const { BattleId: battleId, TeamId: teamId } = req.body;
  const { context } = req;

  Battle.connect(context.player, battleId, teamId)
    .then((battle) => {
    // eslint-disable-next-line no-underscore-dangle
      BattleEventManager.signalConnectBattle(battleId, teamId, context.player._id);
      return mongoose.Promise.resolve(battle);
    })
    .then((battle) => {
      res.status(200).json(
        new Response(true, battle.toObject()).toObject(),
      );
    }).catch((err) => res
      .status(400)
      .json(
        new Response(false, null, `Ошибка подключения к битве (${err.message})`),
      ));
};

export const getActive = (req, res) => {
  Battle.find().active().exec().then((battles) => {
    res.status(200).json(
      new Response(true, battles.map((b) => b.toObject())).toObject(),
    );
  })
    .catch((err) => res
      .status(400)
      .json(
        new Response(false, null, `Ошибка получения активных битв (${err.message})`),
      ));
};

export const getTeams = (req, res) => {
  const { battleId } = req.params;
  Battle.getTeams(battleId).then((teams) => {
    res.status(200).json(
      new Response(true, teams.map((b) => b.toObject())).toObject(),
    );
  })
    .catch((err) => res
      .status(400)
      .json(
        new Response(false, null, `Ошибка получения команд (${err.message})`),
      ));
};
