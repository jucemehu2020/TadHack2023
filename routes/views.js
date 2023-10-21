const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("entro");
    __u.render(req, res, 'template');
});

/*router.get('/', (req, res) => {
    __u.render(req, res, 'iniciar_sesion', {
        recaptcha: __config.recaptcha.key_view
    })
})*/

module.exports = router