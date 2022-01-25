const { validationResult} = require('express-validator');
const bcrypt = require('bcrypt')


// ESTO SERIA EL GESTOR DEL MODELO

const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');
const User = require('../model/user');

const userController = {
    
    login: (req, res)=> {
        res.render('./users/login');
        console.log(req.session);
    },
    processLogin: (req, res) =>{
        let userToLogin = User.findByField('email', req.body.email);


		if (userToLogin) {
			//para saber su en mi base de datos tengo la misma contrase;a que la que el usuario ingreso correra todo bien 
			let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
			if (isOkPassword.password === req.body.password) {
				req.session.userLogged = userToLogin
                return res.redirect('/profile')
			}
		}

		return res.render('./users/login' , {
			errors: {
				email: {
					msg: 'Las credenciales son inválidas!!!'
				}
			}	
		});
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


        let body = req.body
        delete body.confirm
        let userToCreate = {
            
            ...body,
            password: bcrypt.hashSync(req.body.password,10),
            //confirm: deleted,
            avatar:req.file.filename
        }
        // User.create(userToCreate)
        let userCreated =  User.create(userToCreate)
        res.redirect('/login')
    
    },
    profile: (req, res)=> {
        //NO BORREN ESTE LOG PENDEJOS QUE A MI ME SIRVE !!!!!!
        console.log('estas en profile!');
        console.log(req.session);
        res.render('./users/profile',
        {user: req.session.userLogged});

    },
    //PARA TERMINAR LA SESSION
    logout:(req, res)=>{
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    }
};

module.exports = userController;