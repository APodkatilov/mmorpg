
var mongoose = require('mongoose');var Schema = mongoose.Schema;var AmunitionTypes = new Schema({name: {type: String, required: true},img: {type: Buffer, required: true}}); 