const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* MAIN CONTROLLER */
const controller = {
    root: (req, res, next) => {
        res.render('index', {title: 'Home', productos: products});
    },
};

module.exports = controller;