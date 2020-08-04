const fs = require('fs');
const path = require('path');
const db = require("../database/models");

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* MAIN CONTROLLER */
const mainController = {
    root: async (req, res, next) => {
        try {
            const productos = await db.Product.findAll({
                include: ['brandProduct', 'categories'],
                limit: 18,
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