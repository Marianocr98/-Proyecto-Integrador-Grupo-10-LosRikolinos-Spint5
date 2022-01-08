const { validationResult} = require('express-validator');
const bcrypt = require('bcrypt')

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
        //let data = req.body
       // let deleted = delete data.confirm
        let userInDB = User.findByField('email',req.body.email);
        if(userInDB){
            return res.render('../views/users/register.ejs',{
                errors:{
                    email :{
                        msg: 'Este email ya esta registrado'
                    }
            },
            oldData:req.body,
        })
        }



        let userToCreate = {
            
            ...req.body,
            password: bcrypt.hashSync(req.body.password,10),
            confirm: bcrypt.hashSync(req.body.confirm,10),
            //confirm: deleted,
            avatar:req.file.filename
        }
        User.create(userToCreate)
        let userCreated =  User.create(userToCreate)
        res.redirect('/login')
    
    },
    profile: (req, res)=> {
        res.render('./users/profile');
    }
};

module.exports = userController;