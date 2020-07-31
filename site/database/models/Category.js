module.exports = (sequelize, DataTypes) => {
    const alias = 'Category';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
    };
    const config = {
        tableName: 'categories', //nombre de la tabla
        timestamps: false
    };

    const Category = sequelize.define(alias, columnas, config);

    Category.associate = function (models) {
        Category.belongsToMany (models.Product, {
            as: "products" ,
            through: 'category_products',
            foreingKey: 'id_categories',
            otherKey: 'id_products',
            timestamps: false
        })
    }



    return Category;
}