
var PubSub = require('pubsub-js');
PubSub.immediateExceptions = true;


function Builder(type, key, Map){

  this.done = function(topic, data) {
    return PubSub.publish(type.concat(key,'.',topic), data);
  };

  this.on = function(topic, fn) {

    // Ability to subscribe to parent or any child.
    topic = topic === '*' ? '' : ('.'+topic);

    var token = PubSub.subscribe(type.concat(key,topic), fn);
    return {
      off: function() {
        PubSub.unsubscribe(token);
      }
    }
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

  Map.init && Map.init();
  return this;
};


module.exports = {

  offAll: PubSub.clearAllSubscriptions,

  createAction: function(key, Map) {
    return new Builder('action:', key, Map);
  },

  createStore: function(key, Map) {
    return new Builder('store:', key, Map);
  }

};
