const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const adminController = {
    root: (req, res) => {
        res.render('admin/adminView');
    },
    productList: (req, res) => {
        res.render('admin/adminProducts', {
            title: 'Productos',
            listadoProductos: products
        });
    }
};

module.exports = adminController;