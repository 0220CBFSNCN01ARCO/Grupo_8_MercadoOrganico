var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/', adminController.root);

router.get('/products', adminController.productList);

router.get('/products/edit/:id', adminController.editProduct);
router.put('/products/edit/:id', adminController.updateProduct);

router.get('/products/delete/:id', adminController.confirmDeleteProduct);
router.delete('/products/delete/:id', adminController.deleteProduct);

router.get('/users', adminController.userList);

module.exports = router;