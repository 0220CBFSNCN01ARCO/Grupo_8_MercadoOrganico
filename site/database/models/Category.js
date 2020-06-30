module.exports = (sequelize, DataTypes) => {
    const alias = 'Category';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        category_name: {
            type: DataTypes.STRING
        },
    };
    const config = {
        tableName: 'categories', //nombre de la tabla
        timestamps: false
    };

    const Category = sequelize.define(alias, columnas, config);
    return Category;
}