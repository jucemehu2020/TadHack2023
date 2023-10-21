const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    __u.render(req, res, 'template');
});

router.get('/prueba', async (req, res) => {
    __u.render(req, res, 'app-index');
});

/*router.get('/', (req, res) => {
    __u.render(req, res, 'iniciar_sesion', {
        recaptcha: __config.recaptcha.key_view
    })
})*/

module.exports = router