module.exports = (sequelize, DataTypes) => {
    const alias = 'Card';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        card_number: {
            type: DataTypes.INTEGER
        },
        expiration_date: {
            type: DataTypes.INTEGER
        },
        bank: {
            type: DataTypes.INTEGER
        },
        cvv: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.INTEGER
        },
        id_user: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'cards', //nombre de la tabla
        timestamps: false
    };

    const Card = sequelize.define(alias, columnas, config);
    return Card;
}