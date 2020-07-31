module.exports = (sequelize, DataTypes) => {
    const alias = 'Brand';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    };
    const config = {
        tableName: 'brands', //nombre de la tabla
        timestamps: false
    };


    const Brand = sequelize.define(alias, columnas, config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, { //una marca tiene muchos productos
            as: "products",
            foreignKey: "id_brand"
        })

       
    }

    return Brand;
};
