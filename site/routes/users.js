var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');
const {check, validationResult, body} = require('express-validator');
const {loginMiddleware} = require('../middlewares/usersMiddleware');
const models = require('../database/models');

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

router.get('/register', loginMiddleware ,usersController.formRegister);
router.post('/register', upload.single('avatar'),[
  check('nombre').isLength({min: 1}).withMessage('Debe ingresar un nombre'),
  body('email').isEmail().withMessage('El email debe ser un email válido').custom( async (email) => {
    let usuarioExistente = await models.User.findOne({
      where: {
        email: email
      }
    });
    if(usuarioExistente){
      return Promise.reject();
    };
  }).withMessage('El email ya está en uso'),
  body('password')
    .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres')
    .custom( (pass, {req}) => {
      if(pass != req.body.repeat_password){
        throw new Error('Las Passwords no coinciden')
      } else {
        return pass
      }
    })
], usersController.register);

router.get('/login', loginMiddleware, usersController.login);
router.post('/login', [
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres')
], usersController.processLogin);

router.get('/logout', usersController.logout);

router.get('/card', usersController.card);

module.exports = router;
