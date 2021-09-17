'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeccionSchema = Schema({
    numero: Number,
    asignatura: String,
    docente: String,
    alumnos: [String],  
    notificaciones: [{
        titulo: String,
        descripcion: String,
        fecha: {type: Date, default: Date.now }
    }]
});
  
module.exports = mongoose.model('Seccion', SeccionSchema);