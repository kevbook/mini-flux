
var PubSub = require('pubsub-js');
PubSub.immediateExceptions = true;


function Builder(type, key, Map) {

  if (typeof key !== 'string' || typeof Map !== 'object')
    throw new Error('key must be a String and map must be an Object.');

  this.len = (type.length + key.length) + 1;
  this.type = type;
  this.key = key;


  for (var i in Map) {

    // Exclude reserved keys
    if (typeof Map[i] === 'function' &&
        typeof this[i] === 'undefined' &&
        i !== 'init') this[i] = Map[i];
  }

  Map.init && Map.init.call(this);
};


Builder.prototype = {

  done: function(topic, data) {
    return PubSub.publish(this.type.concat(this.key,'.',topic), data);
  },

  on: function(topic, fn, context) {

    // Ability to subscribe to parent or any child.
    topic = topic === '*' ? '' : ('.'+topic);

    var token = PubSub.subscribe(this.type.concat(this.key,topic), function(i, d) {
      fn.call(context||null, i.substring(this.len), d);
    });

    return function() {
      PubSub.unsubscribe(token);
    };
  },

  off: function(topic) {
    return PubSub.unsubscribe(this.type.concat(this.key,'.',topic));
  },

  offAll: function() {
    return PubSub.unsubscribe(this.type.concat(this.key));
  }
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
