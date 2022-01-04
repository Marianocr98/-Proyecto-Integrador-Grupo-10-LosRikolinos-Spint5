const { validationResult} = require('express-validator');

// ESTO SERIA EL GESTOR DEL MODELO

const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

const userController = {
    
    login: (req, res)=> {
        res.render('./users/login');
    },

    register: (req, res)=> {
        res.render('./users/register');
    },
    /*todo lo que se envia del formulario de registro*/
    processRegister: (req, res)=>{
        const resultadosValidos = validationResult(req);
        if(resultadosValidos.errors.length > 0){
            return res.render('./users/register', {
                errors: resultadosValidos.mapped()
            });
        }
    },
    profile: (req, res)=> {
        res.render('./users/profile');
    }
};

module.exports = userController;