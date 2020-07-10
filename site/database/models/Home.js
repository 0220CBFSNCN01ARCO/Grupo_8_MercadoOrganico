module.exports = (sequelize, dataTypes) => {
    const alias = 'Home';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        adress: {
            type: dataTypes.STRING
        },
        number: {
            type: dataTypes.INTEGER
        },
        suburb: {
            type: dataTypes.STRING
        },
        location: {
            type: dataTypes.STRING
        },
        postal_code: {
            type: dataTypes.INTEGER
        },
        id_provincia: {
            type: dataTypes.INTEGER
        }
    };
    const configuracion = {
        tableName: 'home', /* Nombre de la Tabla */
        timestamps: false
    };

    const Home = sequelize.define(alias, columnas, configuracion);
    return Home;
};