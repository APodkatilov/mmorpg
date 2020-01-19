
var mongoose = require('mongoose');var Schema = mongoose.Schema;var TileTypes = new Schema({name: {type: String, required: true},props: {
canWalk: {type: Boolean, required: true},canDrive: {type: Boolean, required: true},canFire: {type: Boolean, required: true},damage: {type: Number, required: true},impedance: {type: Number, required: true},acceleration: {type: Number, required: true}}}); 