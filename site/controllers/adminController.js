const db = require('../database/models')

const fs = require('fs');
const path = require('path');
const productsController = require('./productsController');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const categorias = [
    'FRUTAS SECAS',
    'ESPECIAS',
    'FRUTAS DESHIDRATADAS Y GLASEADAS',
    'LEGUMBRES',
    'CEREALES',
    'CEREALES APTO CELÍACOS',
    'CEREALES APTO DIABÉTICOS',
    'CONFITURAS',
    'ACEINTUNAS',
    'MIEL',
    'BEBIDAS',
    'ACEITES COMETOLÓGICOS',
    'ACEITES AROMÁTICOS',
    'ACEITES COMESTIBLES',
    'ALGAS',
    'CARAMELOS',
    'CHOCOLATES',
    'CALDOS',
    'COSMETOLOGÍA',
    'DULCES',
    'DULCES APTO CELÍACOS',
    'DULCES APTO DIABÉTICOS',
    'SNACKS SALUDABLES',
    'EDULCORANTES',
    'ENLATADOS',
    'FIDEOS',
    'GALLETITAS',
    'GALLETITAS APTA CELÍACOS',
    'GRANOLA',
    'HARINAS',
    'HIERBAS',
    'INFUSIONES',
    'JUGOS',
    'MERMELADAS',
    'PANES',
    'REFRIGERADOS',
    'SALES',
    'SALSAS',
    'SUPLEMENTOS DIETARIOS',
    'YERBAS',
    'MILANESAS',
    'VEGANOS'
];

const adminController = {
    root: (req, res) => {
        res.render('admin/adminView', {
            title: 'ADMIN',
            user: req.session.usuarioLogeado
        });
    }, //funciona

    productList: (req, res) => {
        db.Product.findAll()
        .then(function(product){
            res.render('admin/adminProducts', {
                title: 'Product editor',
                product:product,
                user: req.session.usuarioLogeado})
        }).catch((error) => {
            return res.send('Ocurrió un error')
        }); //nofunciona
    },

    userList: (req, res) => {
        db.User.findAll()
        .then(function(users){
            res.render('admin/adminUsers', {
                title: 'Users Editor',
                users: users,
                user: req.session.usuarioLogeado})
        })
        .catch((error) => {
            return res.send('Ocurrió un error')
        });
    },

    createProduct: (req, res) => {
        res.render('admin/adminProductAdd', {
            title: 'Agregar Producto',
            categories: categorias,
            user: req.session.usuarioLogeado
        });
    },
    registerProduct: (req, res) => {
        db.Product.create({
            name: req.body.nombreProducto,
            description: req.body.descripcion,
            price: req.body.precio,
            id_brand: req.body.marca,
            id_category: req.body.categoria,
            discount: req.body.descuento,
            image: req.file.filename,
        })
        .then(()=> {
            return res.redirect('/admin/products')
        })
        .catch((error)=> {
            return res.send('Ocurrió un error')
            console.log(error);
        })
        
    },
    editProduct: (req, res) => {
        let idProducto = req.params.id;
        let productoAEditar = products.find( producto => {
            return producto.id == idProducto;
        });
        res.render('admin/adminProductEdit', {
            title: productoAEditar.name,
            producto: productoAEditar,
            categories: categorias,
            user: req.session.usuarioLogeado
        });
    },
    updateProduct: (req, res) => {
        const idProducto = req.params.id;
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
                id: idProducto
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