var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', adminMiddleware, adminController.root);
router.get('/products', adminController.products);

module.exports = router;