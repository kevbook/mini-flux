

console.log('Running tests.js');

var miniFlux = require('..');


var a = new miniFlux.createAction({

  init: function() {
    console.log('Init a');
  },

  doX: function(data, data2) {
    console.log('---- do x ----');
    return this.done('doX', { man: 'super' });
  },

});


var s = new miniFlux.createStore({

  init: function() {
    console.log('Init s');

    // Stores should listen to compled actions
    a.on('all', function() {
      console.log('in a displayName');
    });

    a.on('doX', this.solveX);
  },

  solveX: function(d) {
    console.log('---- solve x ----');
  }

})

a.doX('superman', 'batman');

window.a = a;
window.s = s;
