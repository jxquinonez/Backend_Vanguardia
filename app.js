'use strict'

var express = require('express');

//Ejecutar Express
var app = express();

var colegio_routes = require('./routes/colegio');
var usuario_routes = require('./routes/usuario');
var asignatura_routes = require('./routes/asignatura');
var alumno_routes = require('./routes/alumno');
var seccion_routes = require('./routes/seccion');

app.use(express.urlencoded({extended:false}));

app.use(express.json());

//Carga Rutas
app.use('/api', colegio_routes);
app.use('/api', usuario_routes);
app.use('/api', asignatura_routes);
app.use('/api', alumno_routes);
app.use('/api', seccion_routes);



module.exports = app;