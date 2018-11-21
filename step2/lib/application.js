var Router = require('./router');
var http = require('http');

function Application() {}

Application.prototype = {
  router: new Router(),

  get: function(path, fn) {
    return this.router.get(path, fn);
  },

  listen: function(port, cb) {
    var self = this;
    var server = http.createServer(function(req, res) {
      if (!res.send) {
        res.send = function(body) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end(body);
        };
      }
      return self.router.handle(req, res);
    });
    return server.listen.apply(server, arguments);
  }
};

exports = module.exports = Application;
