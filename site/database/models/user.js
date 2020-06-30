module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'users', //nombre de la tabla
        timestamps: false
    };

    const User = sequelize.define(alias, columnas, config);
    return User;
}