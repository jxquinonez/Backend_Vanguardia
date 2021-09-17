'use strict'

var validator = require('validator');
var Alumno = require('../models/alumno');

var controller = {

    save: (req, res) => {
        var params = req.body;

        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_noCuenta = !validator.isEmpty(params.noCuenta);
            var validate_padre = !validator.isEmpty(params.padre);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });  
        }

        if(validate_nombre && validate_noCuenta && validate_padre){
            var alumno = new Alumno();

            alumno.nombre = params.nombre;
            alumno.noCuenta = params.noCuenta;
            alumno.padre = params.padre;

            alumno.save((err, alumnoStored) => {           
                if(err || !alumnoStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El alumno no se ha guardado !!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    alumno: alumnoStored
                });  
            })
 
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Datos no son validos'
            });           
        }  
    },

    getAlumnos: (req, res) => {

        Alumno.find({}).sort('-_id').exec((err, alumnos) => {

            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al obtener alumnos'
                });
            }

            if(!alumnos){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay alumnos'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                alumnos
            });
        })     
    },   

    getAlumno: (req, res) => {

        var alumnoId = req.params.id;

        if(!alumnoId || alumnoId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe alumno con este Id'
            });
        }

        Alumno.findById(alumnoId, (err, alumno) => {
            
            if(err || !alumno){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe alumno con este Id'
                });
            }
            return res.status(200).send({
                status: 'success',
                alumno
            });

        });
    },

    getAlumnosPadres: (req, res) => {

        var padre = req.params.padre;

        if(!padre || padre == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existen alumnos con este padre'
            });
        }

        Alumno.find({padre:padre}, (err, alumno) => {
            
            if(err || !alumno){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existen alumnos con este padre'
                });
            }
            return res.status(200).send({
                status: 'success',
                alumno
            });

        });
    },  
    update: (req, res) => {

        var alumnoId = req.params.id;
        var params = req.body;

        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_noCuenta = !validator.isEmpty(params.noCuenta);
            var validate_padre = !validator.isEmpty(params.padre);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validate_nombre && validate_noCuenta && validate_padre){
             // Find and update
             Alumno.findOneAndUpdate({_id: alumnoId}, params, {new:true}, (err, alumnoUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar.'
                    });
                }

                if(!alumnoUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el alumno'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    alumno: alumnoUpdated
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

        var alumnoId = req.params.id;
        Alumno.findOneAndDelete({_id: alumnoId}, (err, alumnoRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!alumnoRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el alumno.'
                });
            }

            return res.status(200).send({
                status: 'success',
                alumno: alumnoRemoved
            });

        }); 
    } 

};

module.exports = controller;