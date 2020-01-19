
var mongoose = require('mongoose');var Schema = mongoose.Schema;var Players = new Schema({avatar: {type: Buffer},props: {
stamina: {type: Number, required: true},accuracy: {type: Number, required: true},force: {type: Number, required: true},dexterity: {type: Number, required: true}},stat: {
level: {type: Number},credit: {type: Number},winBattles: {type: Number},loseBattles: {type: Number}},battleState: {
health: {type: Number},mapPosX: {type: Number},mapPosY: {type: Number}},createAt: {type: String, required: true},updateAt: {type: String, required: true},Amunitions: [{type: Schema.Types.ObjectId, required: true}]}); 