module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        brands_names: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'brands', //nombre de la tabla
        timestamps: false
    };

    const Brand = sequelize.define(alias, columnas, config);
    return Brand;
};
