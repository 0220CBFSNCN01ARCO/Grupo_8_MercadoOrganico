var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');
const {check, validationResult, body} = require('express-validator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/usersAvatar');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/* GET users listing. */
//router.get('/', usersController.root);

router.get('/register', usersController.formRegister);
router.post('/register', upload.single('avatar'), usersController.register);

router.get('/login', usersController.login);
router.post('/login', [
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
], usersController.processLogin);

router.get('/card', usersController.card);

// router.get('/login/crearcuenta', usersController.crearCuenta);
// router.post('/login/crearcuenta', upload.single('avatar'), usersController.registrarCuenta);

module.exports = router;
