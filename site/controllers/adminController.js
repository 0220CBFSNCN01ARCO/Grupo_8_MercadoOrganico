const db = require('../database/models');

const fs = require('fs');
const path = require('path');

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
    'MILANESAS'
];

const adminController = {
    root: (req, res) => {
        res.render('admin/adminView', {
            title: 'ADMIN',
            user: req.session.usuarioLogeado
        });
    },
    productList: (req, res) => {
        res.render('admin/adminProducts', {
            title: 'Product Editor',
            listadoProductos: products,
            user: req.session.usuarioLogeado
        });
    },
    userList: (req, res) => {
        res.render('admin/adminUsers', {
            title: 'Users Editor',
            listadoUsuarios: users,
            user: req.session.usuarioLogeado
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
        const body = req.body;
        const cantidadProductos = products.length;
        const nuevoID = cantidadProductos + 1;
        const nuevoProducto = {
            id: nuevoID,
            name: body.nombreProducto,
            brand: body.marca,
            category: body.categoria,
            discount: 0,
            description: body.descripcion,
            price: body.precio,
            image: req.file.filename,
        };
        products.push(nuevoProducto);
        fs.writeFileSync('data/products.json', JSON.stringify(products));
        res.redirect('/admin/products');
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
        console.log(idProducto)
        const body = req.body;
        products.map( producto => {
            if(producto.id == idProducto){
                producto.name = body.nombreProducto,
                producto.brand = body.marca,
                producto.category = body.categoria,
                producto.description = body.descripcion,
                producto.price = body.precio,
                producto.image = req.file.filename
            };
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect('/admin/products');
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