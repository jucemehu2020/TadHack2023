const ConexionDB = require('./conexion.js');

async function insertarDatos(oData) {
    const client = await ConexionDB.conectarBD();
    try {
        const query = {
            text: `
            INSERT INTO ${__config.db.nombre_tabla_1_db} (usuario)
            VALUES ($1)
            RETURNING id`,
            values: [oData.usuario],
        };

        const resultado_insercion = await client.query(query);
        const id_obtenido = resultado_insercion.rows[0].id;

        return id_obtenido;

    } catch (error) {
        console.log("Error: ", error);
        throw Error("ERROR_OBTENER_DATOS")
    } finally {
        client.end();
    }
}

async function obtenerDatos() {
    const client = await ConexionDB.conectarBD();
    try {
        const query = {
            text: `SELECT * FROM ${__config.db.nombre_tabla_1_db}`,
        };

        const result = await client.query(query);

        return result.rows[0];
    } catch (error) {
        console.error('Error: ', error);
        throw Error("ERROR_OBTENER_DATOS")
    } finally {
        client.end();
    }
}

module.exports.insertarDatos = insertarDatos
module.exports.obtenerDatos = obtenerDatos
