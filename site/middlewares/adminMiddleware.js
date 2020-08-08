function adminMiddleware(req, res, next) {
    if((req.session.usuarioLogeado == undefined) || (req.session.usuarioLogeado.id_type != 1)) {
        return res.send('Acceso Denegado');
    };
    return next();
};

module.exports = adminMiddleware;