const http = require('http');
const url = require('url');

// 应用程序类
function Application() {
  // 用来保存路由的数组
  this.stack = [
    {
      path: '*',
      method: '*',
      handle: function(req, res) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('404');
      }
    }
  ];
}

// 在Application的原型上拓展get方法，以便Application的实例具有该方法。
Application.prototype.get = function(path, handle) {
  // 将请求路由压入栈内
  this.stack.push({
    path,
    method: 'GET',
    handle
  });
};

// 在Application的原型上拓展listen方法，以便Application的实例具有该方法。
Application.prototype.listen = function() {
  const server = http.createServer((req, res) => {
    if (!res.send) {
      // 拓展res的方法，让其支持send方法
      res.send = function(body) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end(body);
      };
      
    }
    // 循环请求过来放入router数组的对象，当请求方法和路劲与对象一致时，执行回调handler方法
    for (var i = 1, len = this.stack.length; i < len; i++) {
      if (
        (req.url === this.stack[i].path || this.stack[i].path === '*') &&
        (req.method === this.stack[i].method || this.stack[i].method === '*')
      ) {
        return this.stack[i].handle && this.stack[i].handle(req, res);
      }
    }
    return this.stack[0].handle && this.stack[0].handle(req, res);
  });
  return server.listen.apply(server, arguments);
};

module.exports = Application;
