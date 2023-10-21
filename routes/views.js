const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    __u.render(req, res, 'template');
});

router.get('/prueba', async (req, res) => {
    __u.render(req, res, 'app-index');
});

router.get('/torredelreloj', async (req, res) => {
    __u.render(req, res, 'torredelreloj');
});

router.get('/puentedelhumilladero', async (req, res) => {
    __u.render(req, res, 'puentedelhumilladero');
});

router.get('/iglesiasafrancisco', async (req, res) => {
    __u.render(req, res, 'iglesiasafrancisco');
});

/*router.get('/', (req, res) => {
    __u.render(req, res, 'iniciar_sesion', {
        recaptcha: __config.recaptcha.key_view
    })
})*/

module.exports = router