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
        tableName: 'user_type', /* Nombre de la Tabla */
        timestamps: false
    };

    const User_type = sequelize.define(alias, columnas, configuracion);

    User_type.associate = function(models) {
        User_type.hasMany(models.User, {
            as: 'users',
            foreingKey: 'id_type'
        })
    }

    return User_type;
};