module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
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

    Product.associate = function(models) {
        Product.belongsToMany(models.User, {
            as: 'users',
            through: 'user_product',
            ForeingKey: 'id_product',
            otherKey: 'id_user',
            timestamps: false
        })
    }
    return Product;
};