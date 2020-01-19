
var mongoose = require('mongoose');var Schema = mongoose.Schema;var BattleAction = new Schema({num: {type: Number, required: true},props: {
timestamp: {type: Date, required: true},direction: {type: String, required: true}},ActionType: {type: Schema.Types.ObjectId, required: true, ref: 'ActionType'},Player: {type: Schema.Types.ObjectId, ref: 'Players'}}); 