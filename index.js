
var PubSub = require('pubsub-js');
PubSub.immediateExceptions = true;

module.exports = {

  offAll: PubSub.clearAllSubscriptions,

  createAction: function(key) {

    return {
      done: function(topic, data) {
        return PubSub.publish('action:'.concat(key,'.',topic), data);
      },

      on: function(topic, fn) {

        // Ability to subscribe to parent or any child.
        topic = topic === '*' ? '' ? ('.'+topic);

        var token = PubSub.subscribe('action:'.concat(key,topic), fn);
        return {
          off: function() {
            PubSub.unsubscribe(token);
          }
        }
      },

      off: function(topic) {
        return PubSub.unsubscribe('action:'.concat(key,'.',topic));
      },

      offAll: function() {
        return PubSub.unsubscribe('action:'.concat(key));
      }
    };
  },

  createStore: function(key) {

    return {
      done: function(topic, data) {
        return PubSub.publish('store:'.concat(key,'.',topic), data);
      },

      on: function(topic, fn) {

        // Ability to subscribe to parent or any child.
        topic = topic === '*' ? '' ? ('.'+topic);

        var token = PubSub.subscribe('store:'.concat(key,topic), fn);
        return {
          off: function() {
            PubSub.unsubscribe(token);
          }
        }
      },

      off: function(topic) {
        return PubSub.unsubscribe('store:'.concat(key,'.',topic));
      },

      offAll: function() {
        return PubSub.unsubscribe('store:'.concat(key));
      }
    };
  }

};
