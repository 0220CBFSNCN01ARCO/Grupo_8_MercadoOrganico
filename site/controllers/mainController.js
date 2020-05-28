const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* MAIN CONTROLLER */
const mainController = {
    root: (req, res, next) => {
        res.render('index', {title: 'Home', listadoProductos: products});
    },
};

module.exports = mainController;