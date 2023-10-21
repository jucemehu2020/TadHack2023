const express = require('express');
const bodyParser = require('body-parser');
const whiskers = require('whiskers');
const cors = require('cors');
const fs = require('fs');
const config = require('./config/load')
const app = express();

const main = async () => {
    await config.load()

    const routes_views = require('./routes/views')
    const routes_logic = require('./routes/logic')

    app.use(cors())
    /*app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));*/
    app.engine('.html', whiskers.__express);
    app.set('views', __dirname + '/views');
    app.use(express.json({ limit: '3mb' }))
    app.use(express.static(__dirname + '/views/assets'));

    app.use('/', routes_views)
    app.use('/logic', routes_logic)

    app.listen(__config.port_this_server, function () {
        console.log("Run on port:", __config.port_this_server)
    });
}

main()