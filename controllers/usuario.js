'use strict'

var validator = require('validator');
var Usuario = require('../models/usuario');

var controller = {

    save: (req, res) => {
        var params = req.body;

        try {
            var validate_usuario = !validator.isEmpty(params.usuario);
            var validate_password = !validator.isEmpty(params.password);
            var validate_nombreCompleto = !validator.isEmpty(params.nombreCompleto);
            var validate_numeroCedula = !validator.isEmpty(params.numeroCedula);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });
        }

        if (validate_usuario && validate_password && validate_nombreCompleto && validate_numeroCedula) {
            var usuario = new Usuario();

            usuario.usuario = params.usuario;
            usuario.password = params.password;
            usuario.nombreCompleto = params.nombreCompleto;
            usuario.numeroCedula = params.numeroCedula;
            usuario.tipoCuenta = params.tipoCuenta;

            usuario.save((err, usuarioStored) => {

                if (err || !usuarioStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no se ha guardado !!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    usuario: usuarioStored
                });
            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos no son validos'
            });
        }
    },

    getUsuarios: (req, res) => {

        var tipo = req.params.tipo;

        if (!tipo) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe usuario con este Id'
            });
        }

        Usuario.find({tipoCuenta: tipo}).sort('-_id').exec((err, usuarios) => {

            if (err) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al obtener usuarios'
                });
            }

            if (!usuarios) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay usuarios'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                usuarios
            });
        })
    },

    getUsuario: (req, res) => {

        var usuarioId = req.params.id;

        if (!usuarioId || usuarioId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe usuario con este Id'
            });
        }

        Usuario.findById(usuarioId, (err, usuario) => {

            if (err || !usuario) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe usuario con este Id'
                });
            }
            return res.status(200).send({
                status: 'success',
                usuario
            });

        });
    },

    update: (req, res) => {

        var usuarioId = req.params.id;
        var params = req.body;

        try {
            var validate_usuario = !validator.isEmpty(params.usuario);
            var validate_password = !validator.isEmpty(params.password);
            var validate_nombreCompleto = !validator.isEmpty(params.nombreCompleto);
            var validate_numeroCedula = !validator.isEmpty(params.numeroCedula);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_usuario && validate_password && validate_nombreCompleto && validate_numeroCedula) {
            // Find and update
            Usuario.findOneAndUpdate({ _id: usuarioId }, params, { new: true }, (err, usuarioUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar.'
                    });
                }

                if (!usuarioUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el usuario'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    usuario: usuarioUpdated
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }
    },

    delete: (req, res) => {

        var usuarioId = req.params.id;
        Usuario.findOneAndDelete({ _id: usuarioId }, (err, usuarioRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if (!usuarioRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el usuario.'
                });
            }

            return res.status(200).send({
                status: 'success',
                usuario: usuarioRemoved
            });

        });
    },
    auth: (req, res) => {

        var params = req.body;

        if (!params || params == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe usuario con este Id'
            });
        }

        Usuario.find({ usuario: params.usuario }, (err, usuario) => {

            if (err || !usuario) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe usuario con este Id'
                });
            }

            if (usuario.length > 0) {

                if (usuario[0].password === params.password) {
                    return res.status(200).send({
                        status: 'success',
                        usuario: usuario
                    });
                } else {
                    return res.status(200).send({
                        status: 'success',
                        usuario: null
                    });
                }

            } else {
                return res.status(200).send({
                    status: 'success',
                    usuario: null
                });
            }


        });
    },
};

module.exports = controller;