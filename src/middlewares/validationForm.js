const path = require('path');
const { body } = require('express-validator');


const validations = [
    body('fullName')
	.notEmpty().withMessage('Debe completar este campo').bail()
	.isLength({ min : 10}).withMessage('El usuario debe tener al menos 10 caracteres'),
    
	body('email')
	.notEmpty().withMessage('Debe escribir un correo electrónico').bail()
	.isEmail().withMessage('Debe ingresar un correo válido'),
	
    body('password')
	.notEmpty().withMessage('Debe escribir una contraseña').bail()
	.isLength({ min : 8}).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
	.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial').bail(),
    
	body('confirm')
	.trim()
	.notEmpty().withMessage('Debe confirmar su contraseña').bail()
	.custom(async (confirm, {req}) => {
		let password = req.body.password;
		if(password !== confirm) {
			throw new Error("Las contraseñas deben coincidir");
		};
	}),
    
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