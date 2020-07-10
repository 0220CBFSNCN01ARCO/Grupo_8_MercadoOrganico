module.exports = (sequelize, dataTypes) => {
    const alias = 'User_type';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.STRING
        }
    };
    const configuracion = {
        tableName: 'products', /* Nombre de la Tabla */
        timestamps: false
    };

    const User_type = sequelize.define(alias, columnas, configuracion);
    return User_type;
};