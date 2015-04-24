
var Emitter = require('eventemitter3');

module.exports = Action;


function Action(opts) {

  this.actions = new Emitter();
  opts = opts || {};

  for (var key in opts) {
    if (typeof opts[key] === 'function' &&
        typeof this.actions[key] === 'undefined' &&
        key !== 'init' && key !== 'all') {

      this.actions[key] = opts[key].bind(this._done(key));
    }
  }

  // Run init
  opts.init && opts.init.call(this.actions);

  // @ public api
  return this.actions;
};


Action.prototype = {

  _done: function(key) {
    var that = this;

    return {
      done: function() {

        var args = Array.prototype.slice.call(arguments);
        that.actions.emit.apply(that.actions, args);

        // Emit all events provided
        args.unshift('all');
        that.actions.emit.apply(that.actions, args);
      }
    };
  }

};
