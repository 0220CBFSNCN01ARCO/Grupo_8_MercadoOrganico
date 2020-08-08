const db = require('../database/models');

/* PRODUCTS CONTROLLER */
const productsController = {
    root:  async (req, res, next) => {
        try {
            const productos = await db.Product.findAll({
                include: ['brandProduct', 'categories'],
            })
            const categorias = await db.Category.findAll()
            const marcas = await db.Brand.findAll()
            return res.render('index', {
                title: 'Home',
                products: productos,
                categories: categorias,
                brands: marcas,
                user: req.session.usuarioLogeado
            })
        }catch(error) {
            console.log(error)
            return res.send('Ha ocurrido un error!')
        }
    },
    detallarProducto: async (req, res, next) => {
        try {
            const detalleProducto = await db.Product.findByPk(req.params.id)
            const categorias = await db.Category.findAll()
            const marcas = await db.Brand.findAll()
            res.render('productDetail', {
                title: 'Detalle',
                producto: detalleProducto,
                categories: categorias,
                brands: marcas,
                user: req.session.usuarioLogeado
            })
        }catch (error) {
            console.log(error)
            res.send('ocurrio error')
        }
    },

    carrito: (req, res) => {
        res.render('shoppingCart', {title: 'Carrito de Compras'})
    },
};

module.exports = productsController;