define(["require", "exports", "libs/jquery/jquery", "libs/dat.gui/dat.gui", "Game"], function(require, exports, __JQuery__, __MDat__, __MGame__) {
    window.DEBUG = true;
    var JQuery = __JQuery__;

    var $ = JQuery.$;
    var MDat = __MDat__;

    var dat = MDat.gui;
    
    var MGame = __MGame__;

    (function (App) {
        App.MyGame;
        App.MyDat = dat;
        App.AppStarted = false;
        App.Start = function () {
            if(!App.AppStarted) {
                console.log("app started");
                App.MyGame = new MGame.Game();
                window.mg = window.CurrentApp.App.MyGame;
                App.AppStarted = true;
            } else {
                console.log("App is singleton and is already started!");
            }
        };
        App.InitDebugUI = function (dat) {
            var FizzyText = function () {
                this.message = 'dat.gui';
                this.speed = 0.8;
                this.displayOutline = false;
                this.explode = function () {
                    //console.log(App.MyGame);
                                    };
                // Define render logic ...
                            };
            var text = new FizzyText();
            var gui = new dat.GUI();
            gui.add(text, 'message');
            gui.add(text, 'speed', -5, 5);
            gui.add(text, 'displayOutline');
            gui.add(text, 'explode');
        };
        require([
            'libs/domReady!'
        ], function (doc) {
            console.log("document ready");
            //#region "DAT GUI TESTS"
            //console.log(dat);
            if(window.DEBUG) {
                App.InitDebugUI(dat);
            }
            //#endregion "My Region"
            //var button = document.createElement('button');
            //button.innerHTML = "Start App";
            //button.onclick = function () {
            //    console.log("press");
            //    Start();
            //};
            //$("body").append(button);
            App.Start();
        });
        //console.log("window.loaded - jquery append");
        //window.requestAnimFrame = (function () {
        //    return window.requestAnimationFrame ||
        //        window.webkitRequestAnimationFrame ||
        //        window.mozRequestAnimationFrame ||
        //        window.oRequestAnimationFrame ||
        //        window.msRequestAnimationFrame ||
        //        function (callback, element?) {
        //            window.setTimeout(callback, 1000 / 60);
        //        };
        //})();
        //function tick() {
        //    window.requestAnimFrame(tick);
        //}
            })(exports.App || (exports.App = {}));
    var App = exports.App;
    //window.CurrentApp.App = App;
    //
    var InstanceLoader = (function () {
        function InstanceLoader(context) {
            this.context = context;
        }
        InstanceLoader.prototype.getInstance = function (name) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var instance = Object.create(this.context[name].prototype);
            instance.constructor.apply(instance, args);
            return instance;
        };
        return InstanceLoader;
    })();    
})
//@ sourceMappingURL=App.js.map
