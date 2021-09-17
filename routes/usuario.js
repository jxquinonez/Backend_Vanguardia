'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var router = express.Router();


router.post('/save-usuario', UsuarioController.save);
router.get('/usuarios/tipo/:tipo', UsuarioController.getUsuarios);
router.get('/usuario/:id', UsuarioController.getUsuario);
router.put('/usuario/:id', UsuarioController.update);
router.delete('/usuario/:id', UsuarioController.delete);
router.post('/auth', UsuarioController.auth);

module.exports = router;