'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;


// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Vanguardia', { useNewUrlParser:true})
.then(() => {
    console.log('Conexion a la BD bien!!');

    app.listen(port , () => {
        console.log('servidor corriendo en http://localhost:'+port);
    });
});

