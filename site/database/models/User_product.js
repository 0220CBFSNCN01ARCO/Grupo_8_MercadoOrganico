module.exports = (sequelize, dataTypes) => {
    const alias = 'User_product';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        id_product: {
            type: dataTypes.INTEGER
        }
    };
    const configuracion = {
        tableName: 'user_product', /* Nombre de la Tabla */
        timestamps: false
    };

    const User_product = sequelize.define(alias, columnas, configuracion);
    return User_product;
};