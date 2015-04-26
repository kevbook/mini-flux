

console.log('Running tests.js');

var miniFlux = require('..');



// Create an instance a
var a = miniFlux.createAction('a', {

  init: function() {
    console.log('Init a');
  },

  doX: function(data, data2) {
    console.log('---- do x ----');
    return this.done('doX', { man: 'super' });
  },

  doY: function(data, data2) {
    console.log('---- do y ----');
    return this.done('doY');
  },

  tester: function() {
    console.log('---- in tester ----');
  }

});

console.log(a);
console.log(a.tester())






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
