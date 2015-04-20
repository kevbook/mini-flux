
var utils = require('./lib/utils'),
  Emitter = require('tiny-emitter');


module.exports = miniFlux;

function miniFlux(opts) {

  if (typeof opts === 'undefined')
    throw new Error('opts must be passed.');

  // Init things
  this.opts = opts || {};
  this.events = events;
  var that = this;
};


miniFlux.prototype.store = function(opts) {

};


miniFlux.prototype.actions = function(opts) {

};
