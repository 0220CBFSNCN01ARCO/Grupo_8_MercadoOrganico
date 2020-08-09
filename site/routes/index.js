var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');
const productsController = require('../controllers/productsController');

/* GET home page. */
router.get('/', mainController.root);

router.get('/aboutUs', mainController.aboutUs);

router.get('/termsAndConditions', mainController.termsAndConditions);

router.get('/shippingInfo', mainController.shippingInfo);

router.get('howToBuy', mainController.howToBuy);

router.post('/search', productsController.buscar);

module.exports = router;
