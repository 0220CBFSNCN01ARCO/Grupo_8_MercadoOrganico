var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', adminMiddleware, adminController.root);

module.exports = router;