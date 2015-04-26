
var PubSub = require('pubsub-js');
PubSub.immediateExceptions = true;


function Builder(type, key, Map) {

  if (typeof key !== 'string' || typeof Map !== 'object')
    throw new Error('key must be a String and map must be an Object.');

  var len = (type.length + key.length) + 1;

  this.done = function(topic, data) {
    return PubSub.publish(type.concat(key,'.',topic), data);
  };

  this.on = function(topic, fn, context) {

    // Ability to subscribe to parent or any child.
    topic = topic === '*' ? '' : ('.'+topic);

    var token = PubSub.subscribe(type.concat(key,topic), function(i, d) {
      fn.call(context||null, i.substring(len), d);
    });

    return function() {
      PubSub.unsubscribe(token);
    };
  };

  this.off = function(topic) {
    return PubSub.unsubscribe(type.concat(key,'.',topic));
  };

  this.offAll = function() {
    return PubSub.unsubscribe(type.concat(key));
  };


  for (var i in Map) {

    // Exclude reserved keys
    if (typeof Map[i] === 'function' &&
        typeof this[i] === 'undefined' &&
        i !== 'init') this[i] = Map[i];
  }

  Map.init && Map.init.call(this);
  return this;
};


module.exports = {

  emit: PubSub.publish,

  on: PubSub.subscribe,

  off: PubSub.unsubscribe,

  offAll: PubSub.clearAllSubscriptions,

  createAction: function(key, Map) {
    return new Builder('action:', key, Map);
  },

  createStore: function(key, Map) {
    return new Builder('store:', key, Map);
  }

};
