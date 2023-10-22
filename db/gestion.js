const ConexionDB = require('./conexion.js');

async function insertarInformacion(oData) {
    const client = await ConexionDB.conectarBD();
    try {
        const nombre_sitio = oData.nombre_sitio.replace(/ /g, "_");
        const query = {
            text: `
            INSERT INTO ${__config.db.nombre_tabla_popayan_db} (nombre_sitio, historia, curiosidades, otros_lugares)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            values: [nombre_sitio.toLowerCase(), oData.historia, oData.curiosidades, oData.otros_lugares],
        };

        const resultado_insercion = await client.query(query);
        const id_obtenido = resultado_insercion.rows[0].id;

        return id_obtenido;

    } catch (error) {
        console.log("Error: ", error);
        throw Error("ERROR_INSERTAR_DATOS")
    } finally {
        client.end();
    }
}

async function obtenerInformacion(oData) {
    const client = await ConexionDB.conectarBD();
    const nombre_sitio = oData.nombre_sitio.replace(/ /g, "_");
    try {
        const query = {
            text: `SELECT * FROM ${__config.db.nombre_tabla_popayan_db} where = ${nombre_sitio.toLowerCase()}`,
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

module.exports.insertarInformacion = insertarInformacion
module.exports.obtenerInformacion = obtenerInformacion
