const load = async () => {
    const __u = require('../utils/utils')

    global.__config = require('../config/config.json')
    global.__u = __u
}

module.exports.load = load