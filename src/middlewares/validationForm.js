const path = require('path');
const { body } = require('express-validator');


const validations = [
    body('usuario').notEmpty().withMessage('Debe completar este campo'),
    body('email').notEmpty().withMessage('Debe escribir un correo electrónico'),
    body('password').notEmpty().withMessage('Debe escribir una contraseña'),
    body('confirm').notEmpty().withMessage('Debe confirmar su contraseña'),
    body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
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