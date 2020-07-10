module.exports = (sequelize, dataTypes) => {
    const alias = 'User_home';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER
        },
        id_home: {
            type: dataTypes.INTEGER
        }
    };
    const configuracion = {
        tableName: 'user_home', /* Nombre de la Tabla */
        timestamps: false
    };

    const User_home = sequelize.define(alias, columnas, configuracion);
    return User_home;
};