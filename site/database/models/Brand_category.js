module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand_Category';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        id_brands: {
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

    const Brand_Category = sequelize.define(alias, columnas, config);
    return Brand_Category;
}