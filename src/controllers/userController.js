const { validationResult} = require('express-validator');


/*const user = require('../model/user')*/

// ESTO SERIA EL GESTOR DEL MODELO

const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');
const User = require('../model/user');

const userController = {
    
    login: (req, res)=> {
        res.render('./users/login');
    },

    register: (req, res)=> {
        res.render('./users/register');
    },

    /*save: (req, res)=> {

        let newUser = user.add(req.body)
        res.send(newUser);
    },

    access: (req, res)=> {
        res.send(req.body);
    }*/
    /*todo lo que se envia del formulario de registro*/
    processRegister: (req, res)=>{
        const resultadosValidos = validationResult(req);
        if(resultadosValidos.errors.length > 0){
            return res.render('./users/register', {
                errors: resultadosValidos.mapped(),
                oldData: req.body
            });
        }
        
        let userToCreate = {
            ...req.body,
            avatar:req.file.filename
        }
        User.create(userToCreate)
        res.redirect('/')
    },
    profile: (req, res)=> {
        res.render('./users/profile');
    }
};

module.exports = userController;