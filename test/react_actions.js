

console.log('Running tests.js');

var miniFlux = require('..');


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


