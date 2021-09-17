'use strict'

var validator = require('validator');
var Asignatura = require('../models/asignatura');

var controller = {

    save: (req, res) => {
        var params = req.body;

        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
         }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });  
        }

        if(validate_nombre){
            var asignatura = new Asignatura();
            asignatura.nombre = params.nombre;
            asignatura.save((err, asignaturaStored) => {   
                if(err || !asignaturaStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La asignatura no se ha guardado !!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    asignatura: asignaturaStored
                });  
            })
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Datos no son validos'
            });           
        }  
    },

    getAsignaturas: (req, res) => {

        Asignatura.find({}).sort('-_id').exec((err, asignaturas) => {

            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al obtener asignatura'
                });
            }

            if(!asignaturas){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay asignatura'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                asignaturas
            });
        })     
    },   

    getAsignatura: (req, res) => {

        var asignaturaId = req.params.id;

        if(!asignaturaId || asignaturaId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe asignatura con este Id'
            });
        }

        Asignatura.findById(asignaturaId, (err, asignatura) => {
            
            if(err || !asignatura){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe asignatura con este Id'
                });
            }
            return res.status(200).send({
                status: 'success',
                asignatura
            });

        });
    },

    update: (req, res) => {

        var asignaturaId = req.params.id;
        var params = req.body;

        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_nombre){
             // Find and update
             Asignatura.findOneAndUpdate({_id: asignaturaId}, params, {new:true}, (err, asignaturaUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar.'
                    });
                }

                if(!asignaturaUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe la asignatura'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    asignatura: asignaturaUpdated
                });
             });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }  
    },

    delete: (req, res) => {

        var asignaturaId = req.params.id;
        Asignatura.findOneAndDelete({_id: asignaturaId}, (err, asignaturaRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!asignaturaRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado la asignatura.'
                });
            }

            return res.status(200).send({
                status: 'success',
                asignatura: asignaturaRemoved
            });

        }); 
    }   
};

module.exports = controller;

