const { Client } = require('pg');

async function conectarBD() {
    const client = new Client({
        user: __config.db.usuario_db,
        host: __config.db.host_db,
        database: __config.db.nombre_db,
        password: __config.db.contrasena_db,
        port: __config.db.puerto_db,
    });

    try {
        await client.connect();
        return client;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.conectarBD = conectarBD