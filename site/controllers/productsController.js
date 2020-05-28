const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* PRODUCTS CONTROLLER */
const productsController = {
    root: (req, res, next) => {
        res.render('products', {title: 'Productos', listadoProductos: products});
    },
    detallarProducto: (req, res, next) => {
        const id = req.params.id;
        const productoSolicitado = products.find( producto => {
            return producto.id == id;
        });
        res.render('productDetail', {
            title: productoSolicitado.name,
            producto: productoSolicitado
        });
    },
    agregarProducto: (req, res) => {
        res.render('productAdd', {title: 'Agregar Producto'})
    }
};

module.exports = productsController;