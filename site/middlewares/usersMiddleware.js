function usersMiddleware(req, res, next) {
    if( req.session.usuarioLogeado != undefined ) {
        return res.redirect('/');
    };
    return next();
};

module.exports = usersMiddleware;
