
var PubSub = require('pubsub-js'),
  objectAssign = require('object-assign');

PubSub.immediateExceptions = true;


function Builder(key, Map) {

  if (typeof key !== 'string' || typeof Map !== 'object')
    throw new Error('key must be a String and map must be an Object.');

  var that = this;
  var store = {};
  var len = key.length + 1;


  /**
   * Pubsub methods
   **/

   this.store = function(data) {

    if (typeof data !== 'undefined') {

      if (typeof data === 'object') objectAssign(store, data);
      else if (data === null) store = {};
    }

    return store;
   };


  this.publish = function(topic, data, reset) {

    // Adding a custom reset property
    if (typeof data === 'object') objectAssign(data, { __reset: true });

    return PubSub.publish(key+'.'+topic, data);
  };


  this.on = function(topic, fn, context) {

    // Ability to subscribe to parent or any child.
    topic = key + (topic === '*' ? '' : ('.'+topic));

    var token = PubSub.subscribe(topic, function(i, d) {

      // Adding a custom reset property
      if (d.__reset) {
        delete d.__reset;
        fn(i.substring(len), d, true);
      }
      else fn(i.substring(len), d);
    });

    return function() {
      PubSub.unsubscribe(token);
    };
  };


  this.off = function(topic) {
    return PubSub.unsubscribe(topic);
  };


  this.offAll = function() {
    return PubSub.unsubscribe(key);
  }


  /**
   * Build user methods
   **/

  for (var i in Map) {

    // Exclude reserved keys
    if (typeof this[i] === 'undefined' &&
        typeof Map[i] === 'function' &&
        i !== 'init') that[i] = Map[i].bind(that);
  }

  Map.init && Map.init.call(this);
};



module.exports = {

  publish: PubSub.publish,

  on: PubSub.subscribe,

  off: PubSub.unsubscribe,

  offAll: PubSub.clearAllSubscriptions,

  createAction: function(key, Map) {
    return new Builder(key, Map);
  }

};
