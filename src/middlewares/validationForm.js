const path = require('path');
const { body } = require('express-validator');


const validations = [
    body('fullName').notEmpty().withMessage('Debe completar este campo')
	.bail()
	.isLength({ min : 10}).withMessage('El usuario debe tener al menos 10 caracteres'),
    body('email').notEmpty().withMessage('Debe escribir un correo electrónico')
	.bail()
	.isEmail().withMessage('Debe ingresar un correo válido'),
    body('password').notEmpty().withMessage('Debe escribir una contraseña')
	.bail()
	.isLength({ min : 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('confirm').notEmpty().withMessage('Debe confirmar su contraseña'),
    body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Debe subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = validations