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
        },
        admin: {
            type: DataTypes.TYNYINT 
        }
    };
    const config = {
        tableName: 'users', //nombre de la tabla
        timestamps: false
    };

    const User = sequelize.define(alias, columnas, config);

    User.associate = function(models) {
        User.belongsToMany(models.Product, {
            as: 'products',
            through: 'user_product',
            ForeingKey: 'id_user',
            otherKey: 'id_product',
            timestamps: false
        });
    }
    return User;
}