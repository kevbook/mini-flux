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

	var miniFlux = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"..\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	// Create an instance a
	var a = miniFlux.createAction('a');

	console.log(a);

	// var a = miniFlux.createAction({

	//   init: function() {
	//     console.log('Init a');
	//   },

	//   doX: function(data, data2) {
	//     console.log('---- do x ----');
	//     return this.done('doX', { man: 'super' });
	//   },

	//   doY: function(data, data2) {
	//     console.log('---- do y ----');
	//     return this.done('doY');
	//   }

	// });









	// var a = new miniFlux.createAction({

	//   init: function() {
	//     console.log('Init a');
	//   },

	//   doX: function(data, data2) {
	//     console.log('---- do x ----');
	//     return this.done('doX', { man: 'super' });
	//   },

	//   doY: function(data, data2) {
	//     console.log('---- do y ----');
	//     return this.done('doY');
	//   }

	// });


	// var s = new miniFlux.createStore({

	//   init: function() {
	//     console.log('Init s');

	//     // If stores wants to listen to all completed actions
	//     // a.on('all', function(key) {
	//     //   console.log('---- in all: %s ----', key);
	//     // });

	//     a.on('doX', this.solveX);
	//   },

	//   solveX: function(d) {
	//     console.log('---- solve x ----');
	//     return this.done('solveX');
	//   },

	//   solveY: function(d) {
	//     console.log('---- solve y ----');
	//   }

	// });

	// // Listen to stores
	// s.on('solveX', function() {
	//   console.log('---- solve x render ----');
	// });

	// // Do couple of actions
	// a.doX('superman', 'batman');
	// a.doY('kevin');


	// window.a = a;
	// window.s = s;


/***/ }
/******/ ]);