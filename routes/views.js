const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    __u.render(req, res, 'home');
});

router.get('/popayan', async (req, res) => {
    __u.render(req, res, 'template');
});

router.get('/medellin', async (req, res) => {
    __u.render(req, res, 'template_medellin');
});

router.get('/cartagena', async (req, res) => {
    __u.render(req, res, 'template_cartagena');
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

router.get('/info', async (req, res) => {
    __u.render(req, res, 'information');
});

router.get('/belen', async (req, res) => {
    __u.render(req, res, 'belen');
});

router.get('/elmorro', async (req, res) => {
    __u.render(req, res, 'elmorro');
});

router.get('/pueblitopatojo', async (req, res) => {
    __u.render(req, res, 'pueblitopatojo');
});

/*router.get('/', (req, res) => {
    __u.render(req, res, 'iniciar_sesion', {
        recaptcha: __config.recaptcha.key_view
    })
})*/

module.exports = router