'use strict'

//librerias Propias
const Product = require('../models/product')

function getProduct(req,res){
    let productId = req.params.productId
  //Buscando id
  Product.findById(productId,(err,product) => {
    if(err) return res.status('500').send({ message: 'Error al realizar la peticion' })
    if(!product) return res.status('404').send({ message: 'El Producto no existe' })
    res.status(200).send({ product })
  })
    
}

function getProducts(req,res){
    Product.find({},(err,products) =>{
        if(err) return res.status('500').send({ message: 'Error al realizar la peticion' })
        if(!products) return res.status(404).send({ message: 'No exosten productos'})
        //rerotna los productos
        res.send(200,{products})
      })
}

function saveProduct(req,res){
    // CReando un nuevo producto
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    //guardando en la base de datos
    product.save((err,productStored) => {
        if (err) res.status(500).send(`Error al Guardar los datos ${err}`)

        res.status(200).send({product: productStored})
    })
}

function updateProduct(req,res){
    let productId = req.params.productId
    let update = req.body
    //Actualizando Producto
    Product.findByIdAndUpdate(productId,update,(err,productUpdated) => {
        if(err) res.status(500).send(`Error al actualizar el producto ${err} `)
        res.status(200).send({ product: productUpdated })
    })
}

function deleteProduct(req,res){
    let productId = req.params.productId
  //borrando Producto
   Product.findById(productId,(err,product) => {
     if(err)res.status(500).send({ message: `Error al borrar el producto ${err}` })
     //eliminando el producto
     product.remove(err => {
       if (err)res.status(500).send({ message: `Erro al eliminar el producto ${err}` })
       res.status(200).send({ message: 'El producto ha sido eliminado' })
     })
   })
}

module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    saveProduct
}