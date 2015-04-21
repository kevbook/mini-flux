
var Emitter = require('eventemitter3');

module.exports = Actions;


function Actions(opts) {

  this.actions = {};
  this.emitter = new Emitter();

  for (var key in opts) {
    if (key !== 'init' && key !== 'on' &&
        key !== 'once' && key !== 'emit' && key !== 'off' &&
        key !== 'removeListener' && key !== 'removeAllListeners') {

      this.actions[key] = opts[key].bind(this._done(key));
    }
  }

  // Run init
  opts.init && opts.init.call(this.actions);

  // @ public api
  this.actions.on = this.emitter.on;
  this.actions.once = this.emitter.once;
  this.actions.off = this.emitter.off;
  this.actions.removeListener = this.emitter.removeListener;
  this.actions.removeAllListeners = this.emitter.removeAllListeners;

  return this.actions;
};


Actions.prototype._done = function(action) {

  var that = this;

  return {
    done: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(action);
      that.emitter.emit.apply(that.actions, args);
    }
  };
};
