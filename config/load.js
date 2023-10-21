const load = async () => {
    const __u = require('../utils/utils')

    global.__config = require('../config/config.json')
    global.__u = __u

    const __text = require('./text/' + __config.text + '.json');
    global.__text = __text
}

module.exports.load = load