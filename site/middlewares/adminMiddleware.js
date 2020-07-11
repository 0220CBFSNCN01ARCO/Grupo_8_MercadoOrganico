function adminMiddleware(req, res, next) {
    if(res.session == undefined){
        res.send('Acceso Denegado');
    };
    if(!req.session.usuarioLogeado.admin){
        return res.send('Acceso Denegado');
    };
    return next();
};

module.exports = adminMiddleware;