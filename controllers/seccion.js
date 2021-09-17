'use strict'

var validator = require('validator');
const seccion = require('../models/seccion');
var Seccion = require('../models/seccion');

var controller = {

    save: (req, res) => {
        var params = req.body;

        try{
            var validate_numero = !validator.isEmpty(params.numero);
            var validate_asignatura = !validator.isEmpty(params.asignatura);
            var validate_docente = !validator.isEmpty(params.docente);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });  
        }

        if(validate_numero && validate_asignatura && validate_docente){
            var seccion = new Seccion();

            seccion.numero = params.numero;
            seccion.asignatura = params.asignatura;
            seccion.docente = params.docente;

            seccion.alumnos = params.alumnos;
            seccion.notificaciones = params.notificaciones;
            
            seccion.save((err, seccionStored) => {
             
                if(err || !seccionStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'La seccion no se ha guardado !!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    seccion: seccionStored
                });  
            })
 
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Datos no son validos'
            });           
        }  
    },

    getSecciones: (req, res) => {

        Seccion.find({}).sort('-_id').exec((err, seccions) => {
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al obtener secciones'
                });
            }
            if(!seccions){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay secciones'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                seccions
            });
        })     
    },   

    getSeccion: (req, res) => {

        var seccionId = req.params.id;

        if(!seccionId || seccionId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe seccion con este Id'
            });
        }

        Seccion.findById(seccionId, (err, seccion) => {
            
            if(err || !seccion){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe alumno con este Id'
                });
            }
            return res.status(200).send({
                status: 'success',
                seccion
            });

        });
    },

    getSeccionDocente: (req, res) => {

        var docente = req.params.docente;

        if(!docente || docente == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe seccion con este Docente'
            });
        }

        Seccion.find({docente:docente}, (err, seccion) => {
            
            if(err || !seccion){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe seccion con este Docente'
                });
            }
            return res.status(200).send({
                status: 'success',
                seccion
            });

        });
    },

    getSeccionAlumno: (req, res) => {

        var alumno = req.params.nombre;

        if(!alumno || alumno == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe seccion con este alumno'
            });
        }
        // console.log(alumno)
        // Seccion.find(seccion.alumnos,{nombre:alumno}, (err, seccion) => {
        Seccion.find({alumnos:alumno}, (err, seccion) => {
            console.log(err, seccion)
            if(err || !seccion){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existee seccion con este alumno'
                });
            }
            return res.status(200).send({
                status: 'success',
                seccion
            });

        });
    },  

    update: (req, res) => {

        var seccionId = req.params.id;
        var params = req.body;

        try{
            var validate_numero = !validator.isEmpty(params.numero);
            var validate_asignatura = !validator.isEmpty(params.asignatura);
            var validate_docente = !validator.isEmpty(params.docente);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_numero && validate_asignatura && validate_docente){
             Seccion.findOneAndUpdate({_id: seccionId}, params, {new:true}, (err, seccionUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar.'
                    });
                }

                if(!seccionUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el alumno'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    seccion: seccionUpdated
                });
             });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }  
    }
};

module.exports = controller;