const cartController = {
    root: (req, res) => {
        res.render('shoppingCart', {
            title: 'Carrito de compras',
            user: req.session.usuarioLogeado
        })
    }
};



module.exports = cartController;