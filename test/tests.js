

console.log('Running tests.js');

var miniFlux = require('..');



// Create an instance a
var a = miniFlux.createAction('a', {

  init: function() {
    console.log('Init a');
  },

  doX: function(data) {
    console.log('---- do x ----');
    return this.done('doX', { man: 'super' });
  },

  doY: function(data) {
    console.log('---- do y ----');
    return this.done('doY');
  }

});


var s = miniFlux.createStore('s', {

  init: function() {
    console.log('Init s');

    // If stores wants to listen to all completed actions
    a.on('*', function(key) {
      console.log('---- in all: %s ----', key);
    });
    a.on('doX', this.solveX);
  },

  solveX: function(key, data) {
    console.log('---- solve x ----', key);
    this.done('solveX');
  },

  solveY: function(key, data) {
    console.log('---- solve y ----');
  }

});

// // Listen to stores
s.on('solveX', function() {
  console.log('---- solve x render ----');
});


// // Do couple of actions
a.doX('superman');
// a.doY('kevin');


// window.a = a;
// window.s = s;
