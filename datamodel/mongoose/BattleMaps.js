
var mongoose = require('mongoose');var Schema = mongoose.Schema;var BattleMaps = new Schema({name: {type: String, required: true},BattleMapType: {type: Schema.Types.ObjectId, required: true, ref: 'BattleMapType'},Tiles: [{type: Schema.Types.ObjectId, required: true, ref: 'Tiles'}]}); 