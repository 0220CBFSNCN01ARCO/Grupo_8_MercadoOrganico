const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* PRODUCTS CONTROLLER */
const productsController = {
    root: (req, res, next) => {
        res.render('products', {title: 'Productos', listadoProductos: products});
    },
    detallarProducto: (req, res, next) => {
        const id = req.params.id;
        const productoSolicitado = products.find( producto => {
            return producto.id == id;
        });
        res.render('productDetail', {
            title: productoSolicitado.name,
            producto: productoSolicitado
        });
    },
    agregarProducto: (req, res) => {
        res.render('productAdd', {title: 'Agregar Producto'})
    },
    registrarProducto: (req, res) => {
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
        res.send('El registro del producto fue exitoso');
    },
    editarProducto: (req, res) => {
        let idProducto = req.params.idProduct;
        let productoAEditar = products.find( producto => {
            return producto.id = idProducto;
        });
        res.render('productEdit', {
            title: productoAEditar.name,
            producto: productoAEditar
        });
    },
    carrito: (req, res) => {
        res.render('shoppingCart', {title: 'Carrito de Compras'})
    },
};

module.exports = productsController;