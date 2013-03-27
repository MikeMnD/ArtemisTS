// require([
  // 'src/libs/dat.gui/dat.gui.min'
// ], function(GUI) {

  // // No namespace necessary 
  // var gui = new GUI();

// });

console.log("ok");
require([
  'src/libs/dat.gui/dat.gui'
], function (dat) {

    // No namespace necessary 
    console.log(dat);
    
        //var test = dat.GUI();
    require(['src/libs/domReady!'], function (doc) {

        //This function is called once the DOM is ready,
        //notice the value for 'domReady!' is the current
        //document.
        console.log("document ready");

        var FizzyText = function() {
          this.message = 'dat.gui';
          this.speed = 0.8;
          this.displayOutline = false;
          this.explode = function() {};
          // Define render logic ...
        };

        var text = new FizzyText();
        var gui = new dat.GUI();
        gui.add(text, 'message');
        gui.add(text, 'speed', -5, 5);
        gui.add(text, 'displayOutline');
        gui.add(text, 'explode');

    });

});

