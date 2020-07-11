function adminMiddleware(req, res, next) {
    if(req.session.usuarioLogeado.admin){
        return next();
    };
    return res.send('Solo se permite acceso a Admins');
};

module.exports = adminMiddleware;