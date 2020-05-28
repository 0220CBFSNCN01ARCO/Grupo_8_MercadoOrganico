var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.root);
router.get('/login', usersController.login);

module.exports = router;
