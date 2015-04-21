
var Emitter = require('eventemitter3');

module.exports = Actions;


function Actions(opts) {

  this.actions = new Emitter();

  for (var key in opts) {
    if (key !== 'init' && key !== 'on' &&
        key !== 'once' && key !== 'emit' && key !== 'off') {

      this.actions[key] = opts[key].bind(this._done(key));
    }
  }

  // Run init
  opts.init && opts.init.call(this.actions);
  return this.actions;
};


Actions.prototype._done = function(action) {
  var that = this;

  return {
    done: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(action);
      that.actions.emit.apply(that.actions, args);
    }
  };
};
