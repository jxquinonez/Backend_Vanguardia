'use strict'

var express = require('express');
var ColegioController = require('../controllers/colegio');

var router = express.Router();

router.post('/datos-colegio', ColegioController.datosColegio);
router.get('/test-de-controlador', ColegioController.test);

router.post('/save', ColegioController.save);
// router.get('/colegios/:last?', ColegioController.getColegios);
router.get('/colegios', ColegioController.getColegios);
router.get('/colegio/:id', ColegioController.getColegio);
router.put('/colegio/:id', ColegioController.update);
router.delete('/colegio/:id', ColegioController.delete);


module.exports = router;