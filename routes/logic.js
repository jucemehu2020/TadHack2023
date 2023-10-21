const express = require('express');
const router = express.Router();
const GestionBD = require('../db/gestion.js');

router.post('/test', __u.try(async (req, res) => {
    return { respuesta: "funcino" };
}))

router.post('/insertar', __u.try(async (req, res) => {
    var o = req.body
    const resp = await GestionBD.insertarDatos(o)
    return { respuesta: resp }
}))

router.post('/obtener', __u.try(async (req, res) => {
    const resp = await GestionBD.obtenerDatos()
    return { respuesta: resp }
}))

module.exports = router