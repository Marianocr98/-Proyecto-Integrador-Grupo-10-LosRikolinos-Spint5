const { validationResult} = require('express-validator');
const bcrypt = require('bcrypt')


const User = require('../model/user');

const userController = {
    
    login: (req, res)=> {
        console.log(req.cookies);
        res.render('./users/login');
        console.log(req.session);
    },
    processLogin: (req, res) =>{
        let userToLogin = User.findByField('email', req.body.email);


		if (userToLogin) {
			//para saber su en mi base de datos tengo la misma contrase;a que la que el usuario ingreso correra todo bien 
			let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
			if (isOkPassword) {
				req.session.userLogged = userToLogin;

                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, {maxAge:(1000 * 60) * 60})
                }
                return res.redirect('/profile')
			}
		}

		return res.render('./users/login' , {
			errors: {
				email: {
					msg: 'Las credenciales son inválidas!!!'
				}
			}	
		})
},

    register: (req, res)=> {
        res.render('./users/register');
    },

    processRegister: (req, res)=>{
        const resultadosValidos = validationResult(req);
        if(resultadosValidos.errors.length > 0){
            return res.render('./users/register', {
                errors: resultadosValidos.mapped(),
                oldData: req.body
            });
        }

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
            avatar:req.file.filename
        }
        let userCreated =  User.create(userToCreate)
        res.redirect('/login')
    
    },
    profile: (req, res)=> {
        res.render('./users/profile',
        {user: req.session.userLogged});
    },

    logout:(req, res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        console.log(req.session);
        return res.redirect('/');
    }
};

module.exports = userController;