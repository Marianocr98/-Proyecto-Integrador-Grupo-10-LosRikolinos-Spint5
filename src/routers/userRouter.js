const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const logRegisterMiddleware = require('../middlewares/logRegisterMiddleware');


const {body} = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '../public/img/avatars');
    },
    filename: (req, file, cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const uploadFile = multer({storage});

const userController = require('../controllers/userController');

const validos = [
    body('usuario').notEmpty().withMessage('Debe completar este campo'),
    body('email').notEmpty().withMessage('Debe escribir un correo electrónico'),
    body('password').notEmpty().withMessage('Debe escribir una contraseña'),
];

router.get('/login', userController.login);
router.get('/register', userController.register);

/* Procesa el registro*/
router.post('/register', uploadFile.single('avatar'),logRegisterMiddleware, validos, userController.processRegister);

router.get('/profile/:userId', userController.profile);


module.exports = router;