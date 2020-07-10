module.exports = (sequelize, dataTypes) => {
    const alias = 'Provincia';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provincia: {
            type: dataTypes.STRING
        }
    };
    const configuracion = {
        tableName: 'provincias', /* Nombre de la Tabla */
        timestamps: false
    };

    const Provincia = sequelize.define(alias, columnas, configuracion);
    return Provincia;
};