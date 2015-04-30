/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	

	console.log('Running tests.js');

	var miniFlux = __webpack_require__(1);


	console.log(miniFlux);


	// // Create an instance a
	var a = miniFlux.createAction('a', {

	  init: function() {
	    console.log('Init a');
	  },

	  doX: function(data) {
	    console.log('---- in do x ----');
	    return this.publish('doX', data);
	  },

	  doY: function(data) {
	    console.log('---- in do y ----');
	    return this.done('doY', data);
	  }

	});

	var unStar = a.on('*', function(key, data) {
	  console.log('---- in all: %s ----', key, data);
	});

	var unDoX = a.on('doX', function(key, data) {
	  console.log('---- on %s ----', key, data);
	});

	a.on('doY', function(key, data) {
	  console.log('---- on %s ----', key, data);
	});


	// Do couple of actions
	a.doX({ man: 'super' });
	// // a.doY('kevin');

	window.a = a;
	window.unDoX = unDoX;
	window.unStar = unStar;



	// var s = miniFlux.createStore('s', {

	//   init: function() {
	//     console.log('Init s');

	//     // If stores wants to listen to all completed actions
	//   },

	//   solveX: function(key, data) {
	//     console.log('---- solve x ----', key);
	//     this.done('solveX');
	//   },

	//   solveY: function(key, data) {
	//     console.log('---- solve y ----');
	//   }

	// });

	// // // Listen to stores
	// s.on('solveX', function() {
	//   console.log('---- solve x render ----');
	// });




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	var PubSub = __webpack_require__(4),
	  objectAssign = __webpack_require__(3);

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


	  this.publish = function(topic, data) {
	    return PubSub.publish(key+'.'+topic, data);
	  };


	  this.on = function(topic, fn, context) {

	    // Ability to subscribe to parent or any child.
	    topic = key + (topic === '*' ? '' : ('.'+topic));

	    var token = PubSub.subscribe(topic, function(i, d) {
	      // fn.call(context||that, i.substring(that._len), d);
	      fn(i.substring(len), d);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org

	https://github.com/mroderick/PubSubJS
	*/
	(function (root, factory){
		'use strict';

	    if (true){
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if (typeof exports === 'object'){
	        // CommonJS
	        factory(exports);

	    } else {
	        // Browser globals
	        var PubSub = {};
	        root.PubSub = PubSub;
	        factory(PubSub);
	    }
	}(( typeof window === 'object' && window ) || this, function (PubSub){
		'use strict';

		var messages = {},
			lastUid = -1;

		function hasKeys(obj){
			var key;

			for (key in obj){
				if ( obj.hasOwnProperty(key) ){
					return true;
				}
			}
			return false;
		}

		/**
		 *	Returns a function that throws the passed exception, for use as argument for setTimeout
		 *	@param { Object } ex An Error object
		 */
		function throwException( ex ){
			return function reThrowException(){
				throw ex;
			};
		}

		function callSubscriberWithDelayedExceptions( subscriber, message, data ){
			try {
				subscriber( message, data );
			} catch( ex ){
				setTimeout( throwException( ex ), 0);
			}
		}

		function callSubscriberWithImmediateExceptions( subscriber, message, data ){
			subscriber( message, data );
		}

		function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
			var subscribers = messages[matchedMessage],
				callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
				s;

			if ( !messages.hasOwnProperty( matchedMessage ) ) {
				return;
			}

			for (s in subscribers){
				if ( subscribers.hasOwnProperty(s)){
					callSubscriber( subscribers[s], originalMessage, data );
				}
			}
		}

		function createDeliveryFunction( message, data, immediateExceptions ){
			return function deliverNamespaced(){
				var topic = String( message ),
					position = topic.lastIndexOf( '.' );

				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);

				// trim the hierarchy and deliver message to each level
				while( position !== -1 ){
					topic = topic.substr( 0, position );
					position = topic.lastIndexOf('.');
					deliverMessage( message, topic, data, immediateExceptions );
				}
			};
		}

		function messageHasSubscribers( message ){
			var topic = String( message ),
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
				position = topic.lastIndexOf( '.' );

			while ( !found && position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf( '.' );
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
			}

			return found;
		}

		function publish( message, data, sync, immediateExceptions ){
			var deliver = createDeliveryFunction( message, data, immediateExceptions ),
				hasSubscribers = messageHasSubscribers( message );

			if ( !hasSubscribers ){
				return false;
			}

			if ( sync === true ){
				deliver();
			} else {
				setTimeout( deliver, 0 );
			}
			return true;
		}

		/**
		 *	PubSub.publish( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message, passing the data to it's subscribers
		**/
		PubSub.publish = function( message, data ){
			return publish( message, data, false, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.publishSync( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message synchronously, passing the data to it's subscribers
		**/
		PubSub.publishSync = function( message, data ){
			return publish( message, data, true, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.subscribe( message, func ) -> String
		 *	- message (String): The message to subscribe to
		 *	- func (Function): The function to call when a new message is published
		 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
		 *	you need to unsubscribe
		**/
		PubSub.subscribe = function( message, func ){
			if ( typeof func !== 'function'){
				return false;
			}

			// message is not registered yet
			if ( !messages.hasOwnProperty( message ) ){
				messages[message] = {};
			}

			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;

			// return token for unsubscribing
			return token;
		};

		/* Public: Clears all subscriptions
		 */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
			messages = {};
		};

		/*Public: Clear subscriptions by the topic
		*/
		PubSub.clearSubscriptions = function clearSubscriptions(topic){
			var m; 
			for (m in messages){
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
					delete messages[m];
				}
			}
		};

		/* Public: removes subscriptions.
		 * When passed a token, removes a specific subscription.
		 * When passed a function, removes all subscriptions for that function
		 * When passed a topic, removes all subscriptions for that topic (hierarchy)
		 *
		 * value - A token, function or topic to unsubscribe.
		 *
		 * Examples
		 *
		 *		// Example 1 - unsubscribing with a token
		 *		var token = PubSub.subscribe('mytopic', myFunc);
		 *		PubSub.unsubscribe(token);
		 *
		 *		// Example 2 - unsubscribing with a function
		 *		PubSub.unsubscribe(myFunc);
		 *
		 *		// Example 3 - unsubscribing a topic
		 *		PubSub.unsubscribe('mytopic');
		 */
		PubSub.unsubscribe = function(value){
			var isTopic    = typeof value === 'string' && messages.hasOwnProperty(value),
				isToken    = !isTopic && typeof value === 'string',
				isFunction = typeof value === 'function',
				result = false,
				m, message, t;

			if (isTopic){
				delete messages[value];
				return;
			}

			for ( m in messages ){
				if ( messages.hasOwnProperty( m ) ){
					message = messages[m];

					if ( isToken && message[value] ){
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}

					if (isFunction) {
						for ( t in message ){
							if (message.hasOwnProperty(t) && message[t] === value){
								delete message[t];
								result = true;
							}
						}
					}
				}
			}

			return result;
		};
	}));


/***/ }
/******/ ]);