
var Emitter = require('eventemitter3');

module.exports = Action;


function Action(opts) {

  this.action = {};
  this.emitter = new Emitter();

  for (var key in opts) {
    if (key !== 'init' && key !== 'on' &&
        key !== 'once' && key !== 'emit' && key !== 'off' &&
        key !== 'removeListener' && key !== 'removeAllListeners') {

      this.action[key] = opts[key].bind(this._done(key));
    }
  }

  // Run init
  opts.init && opts.init.call(this.action);

  // @ public api
  this.action.on = this.emitter.on;
  this.action.once = this.emitter.once;
  this.action.off = this.emitter.off;
  this.action.removeListener = this.emitter.removeListener;
  this.action.removeAllListeners = this.emitter.removeAllListeners;

  return this.action;
};


Action.prototype = {

  _done: function(action) {
    var that = this;

    return {
      done: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(action);
        that.emitter.emit.apply(that.action, args);
      }
    };
  }

};
