var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.root);
router.get('/register', usersController.register);
router.get('/login', usersController.login);
router.get('/card', usersController.card);

module.exports = router;
