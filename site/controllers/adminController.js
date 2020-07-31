const db = require('../database/models')

const fs = require('fs');
const path = require('path');
const productsController = require('./productsController');
const Product = require('../database/models/Product');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const adminController = {
    root: (req, res) => {
        res.render('admin/adminView', {
            title: 'ADMIN',
            user: req.session.usuarioLogeado
        });
    }, //funciona

    productList: (req, res) => {
        db.Product.findAll({
            include: ['brandProduct', 'categories']
        })
        .then(function(product){
            res.render('admin/adminProducts', {
                title: 'Product editor',
                product: product,
                user: req.session.usuarioLogeado})
        }).catch((error) => {
            console.log(error);
            return res.send('Ocurrió un error')
        }); //funciona
    },

    userList: (req, res) => {
        db.User.findAll({
            include: [ 'products', 'userType']
        })
        .then(function(users){
            res.render('admin/adminUsers', {
                title: 'Users Editor',
                users: users,
                user: req.session.usuarioLogeado})
        })
        .catch((errors) => {
            console.log(errors);
            return res.send('Ocurrió un error')
        }); //funciona aunque no muestra nada
    },

    createProduct: async (req, res) => {
        try {
            const categorias = await db.Category.findAll()
            const marcas = await db.Brand.findAll()
            return res.render('admin/adminProductAdd', {
                title: 'Agregar Producto',
                categories: categorias,
                brands: marcas,
                user: req.session.usuarioLogeado
            })
        }catch(error) {
            return res.send('Ha ocurrido un error!')
        }
    },

    addProduct: (req, res) => {
        db.Product.create({
            name: req.body.nombreProducto,
            description: req.body.descripcion,
            price: req.body.precio,
            id_brand: 1,
            id_category: Number(req.body.categoria),
            discount: req.body.descuento,
            image: req.file.filename,
        })
        .then(()=> {
            return res.redirect('/admin/products')
        })
        .catch((error)=> {
            console.log(error);
            return res.send('Ocurrió un error')
        })
        
    },
    editProduct: async (req, res) => {
        try {
            const productoEditar = await db.Product.findByPk(req.params.id)
            const categorias = await db.Category.findAll()
            return res.render('admin/adminProductEdit', {
                title: 'editar producto',
                producto: productoEditar,
                categories: categorias,
                user: req.session.usuarioLogeado
            })
        }catch (error) {
            return res.send('ocurrio un error')
        }
    },
    updateProduct: (req, res) => {
        db.Product.update({
            name: req.body.nombreProducto,
            description: req.body.descripcion,
            image: req.file.filename,
            price: req.body.precio,
            id_brand: req.body.marca,
            id_category: req.body.categoria,
            discount: 0,
        }, {
            where: {
                id: req.params.id
            }
        }).then(()=> {
            return res.redirect(`admin/adminProductEdit/${idProducto}`);
        }).catch((error) => {
            return res.send('Ocurrió un error');
        });
    },
    confirmDeleteProduct: (req, res) => {
        let productoBuscado = products.find( (elemento) => {
            return elemento.id == req.params.id;
        });
        res.render('admin/adminProductDelete', {
            title: 'Eliminar producto',
            product: productoBuscado,
            user: req.session.usuarioLogeado
        });
    },
    deleteProduct: (req, res) => {
        let idProductoBuscado = req.params.id;
        let productosSinProductoBuscado = products.filter( product =>{
            return product.id != idProductoBuscado;
        });
        let nuevosProductos = JSON.stringify(productosSinProductoBuscado,'utf-8');
        fs.writeFileSync(productsFilePath, nuevosProductos);
        res.redirect("/admin/products")
    },
};

module.exports = adminController;