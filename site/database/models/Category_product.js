module.exports = (sequelize, DataTypes) => {
    const alias = 'Category_product';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        id_products: {
            type: DataTypes.INTEGER
        },
        id_categories: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'brands_categories', //nombre de la tabla
        timestamps: false
    };

    const Category_product = sequelize.define(alias, columnas, config);
    return Category_product;
};