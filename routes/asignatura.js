'use strict'

var express = require('express');
var AsignaturaController = require('../controllers/asignatura');

var router = express.Router();


router.post('/save-asignatura', AsignaturaController.save);
router.get('/asignaturas', AsignaturaController.getAsignaturas);
router.get('/asignatura/:id', AsignaturaController.getAsignatura);
router.put('/asignatura/:id', AsignaturaController.update);
router.delete('/asignatura/:id', AsignaturaController.delete);

module.exports = router;