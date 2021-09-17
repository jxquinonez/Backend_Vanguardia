'use strict'

var express = require('express');
var AlumnoController = require('../controllers/alumno');

var router = express.Router();


router.post('/save-alumno', AlumnoController.save);
router.get('/alumnos', AlumnoController.getAlumnos);
router.get('/alumno/:id', AlumnoController.getAlumno);
router.get('/alumno/padres/:padre', AlumnoController.getAlumnosPadres);
router.put('/alumno/:id', AlumnoController.update);
router.delete('/alumno/:id', AlumnoController.delete);

module.exports = router;