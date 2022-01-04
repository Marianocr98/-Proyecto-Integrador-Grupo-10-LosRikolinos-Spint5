const fs = require('fs');
const path = require('path');

// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('indexProducts');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//**Rutas de acceso disponnible para el usuario  */
const controllerIndex = {
    home: (req,res) =>{

        const home = productModel.home();

        res.render('./menu/index', {homeProducts: home});
    },
    menu: (req,res) =>{

        const menu = productModel.menu();

        res.render('./menu/menu', {categorias : menu} )
    }
} 

module.exports =  controllerIndex;