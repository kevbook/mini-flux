
var Emitter = require('eventemitter3'),
  objectAssign = require('object-assign');


module.exports = Store;

function Store(opts) {

  // Defaults
  this.defaults = ( opts.defaults && opts.defaults() ) || {};
  this.data = objectAssign({}, this.defaults);

  opts = opts || {};
  this.stores = {};
  this.events = new Emitter();
  this.events.reset = this.reset;


  for (var key in opts) {
    if (typeof opts[key] === 'function' &&
        key !== 'init' && key !== 'all' &&
        key !== 'on' && key !== 'once' &&
        key !== 'emit' && key !== 'off' &&
        key !== 'removeListener' && key !== 'removeAllListeners') {

      this.stores[key] = opts[key].bind(this._done());
    }
  }

  // Run init
  opts.init && opts.init.call(this.stores);
  return this.events;
};


Store.prototype = {

  get: function(key) {
    return (typeof key === 'undefined')
      ? this.data
      : this.data[key];
  },

  set: function(key, val) {
    return this.data[key] = val;
  },

  reset: function() {
  return this.data = objectAssign({}, this.defaults);
  },

  _done: function(action) {
    var that = this;

    return {
      get: this.get,
      set: this.set,
      reset: this.reset,

      render: function() {

        var args = Array.prototype.slice.call(arguments);
        that.events.emit.apply(that.events, args);

        // Emit all events provided
        args.unshift('all');
        that.events.emit.apply(that.events, args);
      }
    };
  }

};

