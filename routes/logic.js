const express = require('express');
const router = express.Router();

router.post('/test', async (req, res) => {
    res.send({ respuesta: "Funciono" })
})

module.exports = router