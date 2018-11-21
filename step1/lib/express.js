var app = require('./application');

function createApplication () {
    return new app();
}

exports = module.exports = createApplication;