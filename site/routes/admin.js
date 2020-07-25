var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage: storage });

router.get('/', adminController.root);

router.get('/products', adminController.productList);

router.get('/products/create', adminController.createProduct);
router.post('/products/create', upload.single('imagen-producto'), adminController.addProduct);

router.get('/products/edit/:id', adminController.editProduct);
router.put('/products/edit/:id', upload.single('imagen-producto'), adminController.updateProduct);

router.get('/products/delete/:id', adminController.confirmDeleteProduct);
router.delete('/products/delete/:id', adminController.deleteProduct);

router.get('/users', adminController.userList);

module.exports = router;