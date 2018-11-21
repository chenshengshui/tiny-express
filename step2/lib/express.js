var app = require('./application');
var Router = require('./router');

function createApplication () {
    return new app();
}

exports = module.exports = createApplication;

exports.Router = Router;