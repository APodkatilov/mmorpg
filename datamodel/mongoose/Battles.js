
var mongoose = require('mongoose');var Schema = mongoose.Schema;var Battles = new Schema({moves: {type: BattleMoves, required: true},beginAt: {type: Date},finishAt: {type: Date},createAt: {type: Date, required: true},updateAt: {type: Date, required: true},Teams: {type: Schema.Types.ObjectId, required: true},BattleMap: {type: Schema.Types.ObjectId, required: true},Messages: [{type: Message, required: true}]}); 