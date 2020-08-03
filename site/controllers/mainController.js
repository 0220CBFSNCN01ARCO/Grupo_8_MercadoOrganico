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

    aboutUs: (req, res) => {
        return res.render('information/aboutUs', {
            title: 'Sobre nosotros',
            
        });
    },

    termsAndConditions: (req, res) => {
        return res.render('information/termsAndConditions', {
            title: 'Términos y condiciones'
        })
    },

    shippingInfo: (req, res) => {
        return res.render('information/shippingInfo', {
            title: 'Condiciones de envío'
        })
    },

    howToBuy: (req, res) => {
        return res.render('information/comoComprar', {
            title: "Como Comprar"
        })
    }
};

module.exports = mainController;