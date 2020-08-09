const models = require('../database/models');
const { check, valiationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');

function loginMiddleware(req, res, next) {
    if( req.session.usuarioLogeado != undefined ) {
        return res.redirect('/');
    };
    return next();
};

module.exports = {loginMiddleware};
