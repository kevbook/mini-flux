
var Emitter = require('eventemitter3'),
  objectAssign = require('object-assign');


module.exports = Store;

function Store(opts) {

  // Defaults
  this.defaults = ( opts.defaults && opts.defaults() ) || {};
  this.data = objectAssign({}, this.defaults);

  this.stores = {};
  this.events = new Emitter();
  this.events.reset = this.reset;

  for (var key in opts) {
    if (key !== 'init')
      this.stores[key] = opts[key].bind(this._done(key));
  }

  // Run init
  opts.init && opts.init.call(this.stores);
  return this.events;
};

Store.prototype.get = function(key) {
  return (typeof key === 'undefined')
    ? this.data
    : this.data[key];
};

Store.prototype.set = function(key, val) {
  return this.data[key] = val;
};

Store.prototype.reset = function() {
  return this.data = objectAssign({}, this.defaults);
};

Store.prototype._done = function(action) {

  var that = this;

  return {
    get: this.get,
    set: this.set,
    reset: this.reset,
    done: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(action);
      that.events.emit.apply(that.events, args);
    }
  };
};
