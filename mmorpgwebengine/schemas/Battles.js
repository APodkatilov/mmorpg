import mongoose from 'mongoose';
import BattleMoves from './BattleMoves';
import Message from './Message';
import BattleMapModel from '../models/battleMap';
import BattleMapTypeModel from '../models/battleMapType';
import TeamModel from '../models/team';

export const BattleState = Object.freeze({
  new: 'new',
  inproc: 'inproc',
  docne: 'done',
});

const battleSchema = new mongoose.Schema(
  {
    moves: [{ type: BattleMoves, required: true }],
    state: {
      type: String, required: true, enum: Object.values(['new', 'inproc', 'done']), index: true,
    },
    beginAt: { type: Date },
    finishAt: { type: Date },
    teamCount: { type: Number, min: 0 },
    teamPlayerCount: { type: Number, min: 0 },
    teams: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    battleMap: { type: mongoose.Schema.Types.ObjectId, required: true },
    messages: [{ type: Message, required: true }],
  },
  { timestamps: true },
);

battleSchema.index({ teams: 1 });

battleSchema.statics = {

  createNew: function create(player, mapId) {
    const Model = this;
    // eslint-disable-next-line no-underscore-dangle
    const playerId = player._id;

    return BattleMapModel.findById(mapId).then((map) => {
      if (map == null) {
        throw new Error('Карта не найдена');
      }

      return BattleMapTypeModel.findById(map.battleMapType).then((mapType) => {
        if (mapType == null) {
          throw new Error('Тип карты не найден');
        }

        const battleTeams = [];
        for (let i = 0; i < mapType.teamCount; i++) {
          battleTeams.push(new TeamModel({
            name: `Команда ${i}`,
            players: i === 0 ? [playerId] : null,
          }));
        }

        return TeamModel.insertMany(battleTeams).then((newTeams) => {
          const battleId = mongoose.Types.ObjectId();
          const battle = new Model({
            _id: battleId,
            state: BattleState.new,
            teamCount: mapType.teamCount,
            teamPlayerCount: mapType.teamPlayerCount,
            // eslint-disable-next-line no-underscore-dangle
            teams: newTeams.map((bt) => bt._id),
            battleMap: mapId,
          });
          return player.setActiveBattle(battleId).then(() => battle.save());
        });
      });
    }).catch(((err) => { throw new Error(`Не удалось создать карту ${err.message}`); }));
  },
  connect: function connect(player, battleId, teamId) {
    return this.findById(battleId).then((battle) => battle.connect(player, teamId));
  },
  getTeams: function getTeams(battleId) {
    return this.findById(battleId).then((battle) => battle.getTeams(battleId));
  },
};

battleSchema.methods = {
  getTeams: function getBattles() {
    return TeamModel.find({ _id: { $in: this.teams } });
  },
  connect: function connect(player, teamId) {
    const battle = this;
    // eslint-disable-next-line no-underscore-dangle
    const playerId = player._id;
    return TeamModel.findById(teamId).then((team) => {
      if (team == null) {
        throw new Error('Команда не найдена.');
      }
      if (team.players) {
        if (battle.teamPlayerCount < team.players.length) {
          team.players.push(playerId);
        } else {
          throw new Error('В команде состоит максимально допустимое количество игроков.');
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        team.players = [playerId];
      }
      // eslint-disable-next-line no-underscore-dangle
      return player.setActiveBattle(battle._id).team.save()
        .then(() => mongoose.Promise.resolve(battle));
    });
  },
};

battleSchema.query = {
  active: function active() {
    return this.where('state').equals(BattleState.new);
  },
};


export default battleSchema;
