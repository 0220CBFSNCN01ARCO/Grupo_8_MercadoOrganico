module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.FLOAT
        },
        discount: {
            type: dataTypes.FLOAT
        },
        id_brand: {
            type: dataTypes.INTEGER
        },
        id_category: {
            type: dataTypes.INTEGER
        }
    };
    const configuracion = {
        tableName: 'products', /* Nombre de la Tabla */
        timestamps: false
    };

    const Product = sequelize.define(alias, columnas, configuracion);

    Product.associate = function (models) {
        Product.belongsTo(models.Brand, { //un producto pertenece a una marca
            as: "brandProduct",
            foreingKey: "id_brand"
        })

        Product.belongsToMany(models.Category, {
            as: 'categories',
            through: 'category_product',
            foreingKey: 'id_products', //datos de tabla pivot
            otherKey: 'id_categories',
            timestamps: false,
        })
    }

    
    return Product;
};