var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController');
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

router.get('/', productsController.root);
router.get('/detail/:id', productsController.detallarProducto);

/* COMENTARIO */

module.exports = router;