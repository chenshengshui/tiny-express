var Layer = require('./layer');
var Route = require('./route');
// 路由管理类
function Router() {
  // 用来保存路由的数组
  this.stack = [
    new Layer('*', function(req, res) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('404');
    })
  ];
}

Router.prototype.get = function(path, handle) {
  var route = this.route(path);
  route.get(handle);
  return this;
};

Router.prototype.route = function route(path) {
  var route = new Route(path);
  var layer = new Layer(path, function(req, res) {
    route.dispatch(req, res);
  });
  layer.route = route;
  this.stack.push(layer);
  return route;
};

Router.prototype.handle = function(req, res) {
  var self = this,
    method = req.method;
  for (var i = 1, len = self.stack.length; i < len; i++) {
    if (self.stack[i].match(req.url) && self.stack[i].route && self.stack[i].route._handles_method(method)) {
      return self.stack[i].handle_request(req, res);
    }
  }

  return self.stack[0].handle_request(req, res);
};

module.exports = Router;
