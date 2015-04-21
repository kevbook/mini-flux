

console.log('Running tests.js');

var miniFlux = require('..');


var a = new miniFlux.actions({

  init: function() {
    console.log('Hello');
  },

  doX: function(data, data2) {
    console.log('---- do x ----');
    console.log(data, data2);

    return this.done({ man: 'super' });
  },

});


var s = new miniFlux.store({

  init: function() {
    console.log('World');
    console.log(this);

    // Stores should listen to compled actions
    a.on('doX', this.solveX);
  },

  solveX: function(d) {
    console.log('--solveX--',d);
    console.log(this)
  }

})

a.doX('superman', 'batman');

window.a = a;
window.s = s;
