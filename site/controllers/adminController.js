const db = require('../database/models');

const obtenerMarca = (brands, product) => {
    let marca = brands.find( brand => {
        return brand.id == product.id;
    });
    if(!marca){
        return 'Sin Marca';
    };
    return marca.name;
};

const obtenerCategoria = (categories, product) => {
    let categoria = categories.find( category => {
        return category.id == product.id;
    });
    if(!categoria){
        return 'Sin Categoria';
    };
    return categoria.name;
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
                obtenerMarca,
                obtenerCategoria,
                user: req.session.usuarioLogeado
            })
        } catch(error){
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
            let marcaDeProducto = marcas.find( unaMarca => {
                return productoEditar.id_brand == unaMarca.id;
            });
            let categoriaDeProducto = categorias.find( unaCategoria => {
                return productoEditar.id_brand == unaCategoria.id;
            });
            return res.render('admin/adminProductEdit', {
                title: 'editar producto',
                producto: productoEditar,
                categoriaDeProducto,
                marcaDeProducto,
                brands: marcas,
                categories: categorias,
                user: req.session.usuarioLogeado
            })
        }catch (error) {
            return res.send('ocurrio un error')
        }
    },

    updateProduct: (req, res) => {
        let idProducto = req.params.id;
        console.log(req.body);
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
            return res.redirect('/admin/products');
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

    editUser: async (req, res) => {
        try {
            const usuarioEditar = await db.User.findByPk(req.params.id, {
                include: ['products','userType']
            })
            return res.render('admin/adminUserEdit', {
                title: 'Editar usuario',
                usuario: usuarioEditar,
                user: req.session.usuarioLogeado
            })
        }catch (error) {
            return res.send('ocurrio un error')
        }
    },

    updateUser: (req, res) =>{
        let idUsuario = req.params.id;
        console.log(req.body);
        db.User.update({
            name: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            //avatar: req.file.filename
        }, {
            where: {
                id: idUsuario
            }
        }).then(()=> {
            return res.redirect('/admin/users');
        }).catch((error) => {
            return res.send('Ocurrió un error');
        });
    },

    confirmDeleteUser: (req, res) => {
        const idUser = req.params.id;
        db.User.findByPk(idUser)
        .then((user) => {
            return res.render('admin/adminUserDelete', {
                title: 'Eliminar usuario',
                usuario: user
            })
        })
        .catch((error) => {
            console.log(error);
            return res.send('Ocurrió un error al intentar eliminar el usuario')
        }) 
    },

    deleteUser: (req, res) => {
        const idUser = req.params.id;
        db.User.destroy({
            where: {
                id: idUser
            }
        })
        .then(() => {
            return res.redirect('/admin/users')
        })
        .catch((error) => {
            return res.send('Ocurrió un error')
        })
    },
};

module.exports = adminController;