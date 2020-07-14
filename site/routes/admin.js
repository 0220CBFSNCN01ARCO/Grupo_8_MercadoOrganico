var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/', adminController.root);
router.get('/products', adminController.productList);
router.get('/users', adminController.userList);

module.exports = router;