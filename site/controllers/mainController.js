const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* MAIN CONTROLLER */
const mainController = {
    root: (req, res, next) => {
        let usuario = req.session.usuarioLogeado;
        return res.render('index', {
            title: 'Home',
            listadoProductos: products,
            user: usuario
        });
    },

    aboutUs: (req, res, next) => {
        return res.render('information/aboutUs')
    }
};

module.exports = mainController;