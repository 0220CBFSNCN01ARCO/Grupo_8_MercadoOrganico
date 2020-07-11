var express = require('express');
var router = express.Router();

router.get('/', adminController.root);
router.get('/products', adminController.productList);
// router.get('/users', adminController.userList);

module.exports = router;