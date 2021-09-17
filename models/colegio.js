'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColegioSchema = Schema({
    nombre: String,
    telefono: String,
    date: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Colegio', ColegioSchema);