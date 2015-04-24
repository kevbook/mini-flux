
var Emitter = require('eventemitter3');

module.exports = Action;


function Action(opts) {

  this.action = {};
  this.emitter = new Emitter();
  opts = opts || {};


  for (var key in opts) {
    if (typeof opts[key] === 'function' &&
        key !== 'init' && key !== 'all' &&
        key !== 'on' && key !== 'once' &&
        key !== 'emit' && key !== 'off' &&
        key !== 'removeListener' && key !== 'removeAllListeners') {

      this.action[key] = opts[key].bind(this._done());
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
  this.action.displayName = opts.displayName;

  return this.action;
};


Action.prototype = {

  _done: function() {

    var that = this;

    return {
      done: function() {

        var args = Array.prototype.slice.call(arguments);
        that.emitter.emit.apply(that.action, args);

        // Emit all events provided
        args.unshift('all');
        that.emitter.emit.apply(that.action, args);
      }
    };
  }

};
