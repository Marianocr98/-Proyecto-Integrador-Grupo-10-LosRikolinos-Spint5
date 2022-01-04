const path = require('path');
const { body } = require('express-validator');


module.exports = [
    body('usuario').notEmpty().withMessage('Debe completar este campo'),
    body('email').notEmpty().withMessage('Debe escribir un correo electrónico'),
    body('password').notEmpty().withMessage('Debe escribir una contraseña'),
]