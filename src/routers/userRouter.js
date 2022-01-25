const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {body} = require('express-validator');



//Requiero userController
const userController = require('../controllers/userController');


//REQUIRIENDO Middlewares 
const logRegisterMiddleware = require('../middlewares/logRegisterMiddleware');

const multerUpFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationForm');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');





//RUTAS HACIA EL CONTROLLER

router.get('/register', guestMiddleware, userController.register);
router.get('/login', guestMiddleware, userController.login);


//router.post('/access', userController.access);

//router.post('/save', userController.save);

/* Procesa el registro*/
router.post('/register', multerUpFile.single('avatar'),logRegisterMiddleware, validations, userController.processRegister);

router.get('/profile', authMiddleware, userController.profile);

/*Procesar el Login*/

router.post('/login', userController.processLogin);

router.get('/logout/', userController.logout);


module.exports = router;