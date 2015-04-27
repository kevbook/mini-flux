
var PubSub = require('pubsub-js');
PubSub.immediateExceptions = true;


function Builder(type, key, Map) {

  if (typeof key !== 'string' || typeof Map !== 'object')
    throw new Error('key must be a String and map must be an Object.');

  var that = this;
  this._len = (type.length + key.length) + 1;
  this._type = type;
  this._key = key;


  var bypassFn = function(topic) {
    return function(data) {
      that.done(topic, data);
    }
  };

  var setMap = function(i) {
    // Check if we need to manually build the bypass Fn
    that[i] = (typeof Map[i] === 'object' && Map[i].bypass)
      ? bypassFn(Map[i].bypass)
      : Map[i].bind(that);
  };


  /**
   * Pubsub methods
   **/

  this.dispatch = function(topic, data) {
    return PubSub.publish(this._type.concat(that._key,'.',topic), data);
  };

  this.on = function(topic, fn, context) {

    // Ability to subscribe to parent or any child.
    topic = topic === '*' ? '' : ('.'+topic);

    var token = PubSub.subscribe(this._type.concat(that._key,topic), function(i, d) {
      // fn.call(context||that, i.substring(that._len), d);
      fn(i.substring(that._len), d);
    });

    return function() {
      PubSub.unsubscribe(token);
    };
  };

  this.off = function(topic) {
    return PubSub.unsubscribe(this._type.concat(that._key,'.',topic));
  };

  this.offAll = function() {
    return PubSub.unsubscribe(this._type.concat(that._key));
  }


  /**
   * Build user methods
   **/

  for (var i in Map) {

    // Exclude reserved keys
    if ( (typeof this[i] === 'undefined' && i !== 'init') &&
          (typeof Map[i] === 'function' ||
            (typeof Map[i] === 'object' && Map[i].bypass) )
    ) setMap(i);
  }

  Map.init && Map.init.call(this);
};



module.exports = {

  dispatch: PubSub.publish,

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
