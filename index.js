'use strict'
//llamados
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
//conecxion con base de datos
mongoose.connect(config.db,(err,res) => {
  if(err){
    console.log('Error al conectarse a la base de datos ')
  }
  console.log('Conexion Establecida');
  //Creacion del servidor
  app.listen(config.port,() => {
     console.log(`API REST Corriendo en http://localhost:${config.port}`)
  })
})
