function adminMiddleware(req, res, next) {
    if(req.session.usuarioLogeado == undefined || !req.session.usuarioLogeado.admin) {
        return res.send('Acceso Denegado');
    };
    return next();
};

module.exports = adminMiddleware;