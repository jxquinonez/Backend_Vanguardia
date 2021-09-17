'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AlumnoSchema = Schema({
    nombre: String,
    noCuenta: String,
    padre: String,
});
  
module.exports = mongoose.model('Alumno', AlumnoSchema);