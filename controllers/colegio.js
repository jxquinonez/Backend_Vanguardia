'use strict'

var validator = require('validator');
var Colegio = require('../models/colegio');

var controller = {

    datosColegio: (req, res) => {

        return res.status(200).send({
            nombre: 'Tecnico Morazan',
            telefono: '32405060',
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Aqui estamos en el Test'
        });
    },

    save: (req, res) => {
        var params = req.body;

        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_telefono = !validator.isEmpty(params.telefono);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });  
        }

        if(validate_nombre && validate_telefono){
            var colegio = new Colegio();

            colegio.nombre = params.nombre;
            colegio.telefono = params.telefono;

            colegio.save((err, colegioStored) => {
             
                if(err || !colegioStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El colegio no se ha guardado !!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    colegio: colegioStored
                });  

            })
 
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Datos no son validos'
            });           
        }
    
    },

    getColegios: (req, res) => {

        Colegio.find({}).sort('-_id').exec((err, colegios) => {

            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al obtener Colegios'
                });
            }

            if(!colegios){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay Colegios'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                colegios
            });
        })     
    },

    getColegio: (req, res) => {

        var colegioId = req.params.id;

        if(!colegioId || colegioId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe colegio con este Id'
            });
        }

        Colegio.findById(colegioId, (err, colegio) => {
            
            if(err || !colegio){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe colegio con este Id'
                });
            }
            return res.status(200).send({
                status: 'success',
                colegio
            });

        });
    },

    update: (req, res) => {

        var colegioId = req.params.id;
        var params = req.body;

        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_telefono = !validator.isEmpty(params.telefono);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_nombre && validate_telefono){
             // Find and update
             Colegio.findOneAndUpdate({_id: colegioId}, params, {new:true}, (err, colegioUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar.'
                    });
                }

                if(!colegioUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el colegio'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    colegio: colegioUpdated
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

        var colegioId = req.params.id;
        Colegio.findOneAndDelete({_id: colegioId}, (err, colegioRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!colegioRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el colegio.'
                });
            }

            return res.status(200).send({
                status: 'success',
                colegio: colegioRemoved
            });

        }); 
    }   

};

module.exports = controller;