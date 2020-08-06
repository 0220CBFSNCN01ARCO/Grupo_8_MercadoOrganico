const db = require('../database/models')

const fs = require('fs');
const path = require('path');
const productsController = require('./productsController');
const Product = require('../database/models/Product');

const obtenerResultado = (array, product) => {
    let marca = array.find( value => {
        return value.id == product.id;
    });

    return marca.name;
};

const adminController = {
    root: (req, res) => {
        res.render('admin/adminView', {
            title: 'ADMIN',
            user: req.session.usuarioLogeado
        });
    }, //funciona

    productList: async (req, res) => {
        try{
            const productos = await db.Product.findAll({
                include: ['brandProduct', 'categories']
            })
            const categorias = await db.Category.findAll()
            const marcas = await db.Brand.findAll()
            return res.render('admin/adminProducts', {
                title: 'Product Editor',
                productos: productos,
                categories: categorias,
                brands: marcas,
                obtenerResultado,
                user: req.session.usuarioLogeado
            })
        } catch(error){
            return res.send('Ocurrió un error')
        }
    },

    userList: async (req, res) => {
        try {
            const usuarios = await db.User.findAll({
                include: ['products', 'userType']
            })
            return res.render('admin/adminUsers', {
                title: 'Users Editor',
                users: usuarios,
                user: req.session.usuarioLogeado
            })
        }catch (error) {
            return res.send('Ocurrió un error')
        }
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
            const marcas = await db.Brand.findAll()
            return res.render('admin/adminProductEdit', {
                title: 'editar producto',
                producto: productoEditar,
                categories: categorias,
                brands: marcas,
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
            return res.redirect(`admin/adminProductEdit/${id}`);
        }).catch((error) => {
            return res.send('Ocurrió un error');
        });
    },
    confirmDeleteProduct: (req, res) => {
        const idProducto = req.params.id;
        db.Product.findByPk(idProducto)
        .then((producto) => {
            return res.render('admin/adminProductDelete', {
                title: 'Eliminar producto',
                producto: producto
            })
        })
        .catch((error) => {
            return res.send('Ocurrió un error')
        }) 
    },

    deleteProduct: (req, res) => {
        const idProducto = req.params.id;
        db.Product.destroy({
            where: {
                id: idProducto
            }
        })
        .then(() => {
            return res.redirect('/admin/products')
        })
        .catch((error) => {
            return res.send('Ocurrió un error')
        })
    },
};

module.exports = adminController;