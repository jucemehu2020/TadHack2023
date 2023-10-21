const https = require('https')
const http = require('http')

async function render(req, res, view, opt = {}) {
    const assetsCss = './assets/css/'
    const assetsJs = './assets/js/'
    if (!opt.partials) {
        opt.partials = {
            css: assetsCss + view + '.css',
            body: view + '.html',
            js: assetsJs + view + '.js'
        }
    }
    res.render('main.html', opt)
}

function ajaxBack(opt) {
    return new Promise((resolve, reject) => {
        const path_params = opt.path_params ? '?' + querystring.stringify(opt.path_params) : ''
        const port = opt.port ? opt.port : __config.port_conection_server
        const http_handler = __config.protocol_conection_is_http == false ? https : http
        const timeout = opt.timeout ? opt.timeout : 3000
        const method = opt.method ? opt.method : 'POST'
        var headers = opt.headers ? opt.headers : {}
        var sData = ''
        if (opt.data) {
            sData = JSON.stringify(opt.data)
            headers['Content-Type'] = 'application/json'
        }
        headers['token-faceticket'] = opt.headers['token-faceticket']
        const oSend = {
            host: opt.host,
            path: opt.path + path_params,
            port,
            method,
            timeout,
            headers
        }
        //console.log("oSend", oSend)
        var httpsRequest = http_handler.request(oSend,
            (response) => {
                var str = ''
                response.on('data', function (chunk) {
                    str += chunk;
                })
                response.on('end', function () {
                    resolve(str);
                })
            }
        );

        httpsRequest.on('timeout', function (err) {
            console.log("ERROR_SERVER_TIMEOUT", err)
            var error = ''
            if (err && err.message)
                error = err.message
            reject(Error("ERROR_SERVER_TIMEOUT|" + error))

        });
        httpsRequest.on('error', function (err) {
            console.log("ERROR_SERVER_ERROR", err)
            var error = ''
            if (err && err.message)
                error = err.message
            reject(Error("ERROR_SERVER_ERROR|" + error))

        });
        httpsRequest.write(sData);
        httpsRequest.end();
    });
}

module.exports.render = render
module.exports.ajaxBack = ajaxBack