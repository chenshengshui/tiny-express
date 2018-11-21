/*
 * @Author: chenshengshui 
 * @Descrition: Route类 
 * @email: chenshengshui@cvte.com 
 * @Date: 2018-11-20 16:12:18 
 * @Last Modified time: 2018-11-20 16:12:18 
 */
var Layer = require('./layer');

function Route (path) {
    this.path = path;
    this.stack = []; // 用于记录相同路径不同method的路由
    this.methods = {}; // 用于记录是否存在该请求方式
}


/**
 * Determine if the route handles a given method.
 * @private
 */
Route.prototype._handles_method = function (method) {
    var name = method.toLowerCase();
    return Boolean(this.methods[name]);
}

Route.prototype.get = function (fn) {
    var layer = new Layer('/', fn);
    layer.method = 'get';
    this.methods['get'] = true;
    this.stack.push(layer);

    return this;
}

Route.prototype.dispatch = function(req, res) {
    var self = this,
        method = req.method.toLowerCase();
    
    for(var i = 0, len = self.stack.length; i < len; i++) {
        if(method === self.stack[i].method) {
            return self.stack[i].handle_request(req, res);
        }
    }
}

module.exports = Route;

