
var Emitter = require('eventemitter3');

module.exports = Store;


function Store(opts) {

  // Defaults
  this.defaults = ( opts.defaults && opts.defaults() ) || {};

  this.stores = {};
  this.events = new Emitter();

  for (var key in opts) {
    if (key !== 'init')
      this.stores[key] = opts[key].bind(this._done(key));
  }

  // Run init
  opts.init && opts.init.call(this.stores);
  return this.events;
};

Store.prototype.get = function(key) {
  return this.defaults[key]
};

Store.prototype.set = function(key, val) {
  return this.defaults[key] = val;
};

Store.prototype._done = function(action) {
  var that = this;

  return {
    get: this.get,
    set: this.set,
    done: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(action);
      that.events.emit.apply(that.events, args);
    }
  };
};
