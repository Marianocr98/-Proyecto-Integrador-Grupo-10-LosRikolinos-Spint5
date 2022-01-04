const express = require('express');
const router = express.Router();

const controllerIndex = require('../controllers/indexController');

router.get('/', controllerIndex.home);
router.get('/menu', controllerIndex.menu);



module.exports = router;