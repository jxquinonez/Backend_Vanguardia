'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AsignaturaSchema = Schema({
    nombre: String,
});
  
module.exports = mongoose.model('Asignatura', AsignaturaSchema);