'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsuarioSchema = Schema({
    usuario: String,
    password: String,
    nombreCompleto: String,
    numeroCedula: String,
    tipoCuenta: String
});
  
module.exports = mongoose.model('Usuario', UsuarioSchema);