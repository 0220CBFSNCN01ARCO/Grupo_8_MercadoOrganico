const models = require('../database/models');

function loginMiddleware(req, res, next) {
    if( req.session.usuarioLogeado != undefined ) {
        return res.redirect('/');
    };
    return next();
};

function emailExistente(req, res, next){
    models.User.findAll()
        .then( (usuarios) => {
            for(let usuario of usuarios){
                if(usuario.email == req.body.email){
                    res.render('register', {
                        title: 'Register',
                        errors: [
                            {msg: 'Email ya existente'}
                        ],
                        user: req.session.usuarioLogeado
                    });
                    break;
                };
            };
        })
        .catch(error => {
            return res.send('Ocurrió un error');
        });
};

module.exports = {loginMiddleware, emailExistente};
