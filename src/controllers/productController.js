const fs = require('fs');
const path = require('path');

// ESTO SERIA EL GESTOR DEL MODELO

const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');


const productController = {

    productos: (req,res) => {

        const products = productModel.productos();

        res.render('./productos/productos' ,{productos:products})
    },

    viewCreate: (req,res)=>{

        let listProduct = productModel.all();
        res.render('./admin/admin', {listProduct})
    },

    createProduct:(req,res)=>{
        let value = {
        id: 0,
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description,
        price: Number(req.body.price),
        section: "productos",
        category: req.body.category
        }

        productModel.create(value);
        res.redirect('/viewCreate')
    },


    productEdition : (req,res)=>{
        let producto = productModel.find(req.params.id)
        res.render( './admin/productEdition', {producto})
    },

    edit : (req,res)=>{
        let product = productModel.find(req.params.id);

		let aCambiar = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file != null ? req.file.filename : product.image
        };
		productModel.update(aCambiar);
		res.redirect('/viewCreate');
    },

    delete : (req,res)=>{
        productModel.delete(req.params.id);
		res.redirect('/viewCreate');
    },
    
    productDetail: (req, res) => {
        let detalle = productModel.find(req.params.id);
        res.render('./productos/productDetail', {detail: detalle});
    },

    category: (req, res) => {

        const productos = productModel.searchCategory(req.params.categoria);

        res.render('./productos/categorias', {productos})
    },
    search: (req, res) => {

        let busqueda = req.query.search.toLowerCase();
        // console.log("Estoy buscando:" + busqueda);

        let productos = productModel.readFile();

        let filtrados = productos.filter(e => e.title.toLowerCase().includes(busqueda) || e.category.toLowerCase().includes(busqueda));

        res.render('./menu/comidaReq', { filtrados: filtrados})
    },
    
    shoppingCart : (req,res)=>{
        res.render('./productos/shopping-cart');
    }, 

}


module.exports = productController;