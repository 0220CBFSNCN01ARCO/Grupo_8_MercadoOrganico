module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
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
            foreignKey: 'id_user',
            otherKey: 'id_product',
            timestamps: false
        })
        
        User.belongsTo(models.User_type, {
            as: 'userType',
            foreignKey: 'id_type'
        })
    }

    
    return User;
}