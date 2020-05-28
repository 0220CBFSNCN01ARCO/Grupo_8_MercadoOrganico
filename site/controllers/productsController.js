const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* MAIN CONTROLLER */
const productsController = {
    root: (req, res, next) => {
        res.render('products', {title: 'Productos', listadoProductos: products});
    },
};

module.exports = controller;