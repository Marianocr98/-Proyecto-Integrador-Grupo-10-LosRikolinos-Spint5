const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });


// -----------EN PROCESO------------------------
router.get('/shopping-cart', productController.shoppingCart);

// -----------EN PROCESO------------------------

// -----------TERMINADOS------------------------

//-- Listado de productos
router.get('/productos', productController.productos)

// ----RUTA DE LAS CATEGORIAS DE LOS PRODUCTOS---
router.get('/productos/:categoria', productController.category);

//-- Detalle de un producto particular
router.get('/productDetail/:id', productController.productDetail);

// ----RUTA DE LA BARRA DEL BUSCADOR---- 
router.get('/search', productController.search);

//  --------VISTA DEL FORMULARIO DE CREACION - ADMIN--------
router.get('/viewCreate', productController.viewCreate)

// Acción de creación (a donde se envía el formulario)-check
router.post('/productos/createProduct', upload.single('imgProductos'), productController.createProduct)

//  --------VISTA DEL FORMULARIO DE EDICION- ADMIN--------
router.get('/productEdition/:id', productController.productEdition);

//  --------EDICION DE UN PRODUCTO--------
router.put('/productEdition/:id', upload.single('imgProductos'), productController.edit);

//  --------ELIMINACION DE UN PRODUCTO--------
router.delete('/productDelete/:id', productController.delete);
// -----------TERMINADOS------------------------


module.exports = router;