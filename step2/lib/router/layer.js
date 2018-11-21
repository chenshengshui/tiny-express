/*
 * @Author: chenshengshui 
 * @Descrition: Layer 
 * @email: chenshengshui@cvte.com 
 * @Date: 2018-11-20 15:39:38 
 * @Last Modified time: 2018-11-20 15:39:38 
 */

function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || '<anonumous>';
    this.path = path;
  }
  
  /**
   * Handle the request for the layer.
   *
   * @param {Request} req
   * @param {Response} res
   */
  Layer.prototype.handle_request = function(req, res) {
    var fn = this.handle;
    if (fn) {
      fn(req, res);
    }
  };
  
  /**
   * Check if this route matches `path`
   *
   * @param {String} path
   * @return {Boolean}
   */
  Layer.prototype.match = function(path) {
    if (path === this.path || path === '*') {
      return true;
    }
    return false;
  };
  
  module.exports = Layer;