'use strict'

var express = require('express');
var SeccionController = require('../controllers/seccion');

var router = express.Router();


router.post('/save-seccion', SeccionController.save);
router.get('/seccions', SeccionController.getSecciones);
router.get('/seccion/:id', SeccionController.getSeccion);
router.get('/seccion/docente/:docente', SeccionController.getSeccionDocente);
router.get('/seccion/alumnos/:nombre', SeccionController.getSeccionAlumno);
router.put('/seccion/:id', SeccionController.update);

module.exports = router;