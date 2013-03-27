///<reference path="core/dts/require.d.ts"/>
///<reference path="core/dts/webgl.d.ts"/>
///<reference path="libs/jquery/jquery-int.d.ts"/>

interface IWindow extends Window {
    requestAnimFrame(callback: any, element?: any): void;
    mg: any;
    CurrentApp: any;
    DEBUG: bool;
}
declare var window: IWindow;

window.DEBUG = true;

import JQuery = module("libs/jquery/jquery");
var $: JQueryStatic = JQuery.$;
import MDat = module("libs/dat.gui/dat.gui");
var dat: any = MDat.gui;


import MBitSet = module("core/utils/BitSet");


import MGame = module("Game");

export module App {
    
    export var MyGame;
    export var MyDat = dat;
    export var AppStarted = false;

    export var Start = function () {
        if (!AppStarted) {
            console.log("app started");
            MyGame = new MGame.Game();
            window.mg = window.CurrentApp.App.MyGame;
            AppStarted = true;
        } else {
            console.log("App is singleton and is already started!");
        }
    };

    export var InitDebugUI = function (dat) {

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

    }

    require(['libs/domReady!'], function (doc) {

        console.log("document ready");

        //#region "DAT GUI TESTS"
        //console.log(dat);
        if (window.DEBUG) {
            InitDebugUI(dat);
        }

        //#endregion "My Region"

        //var button = document.createElement('button');
        //button.innerHTML = "Start App";
        //button.onclick = function () {
        //    console.log("press");

        //    Start();
        //};
        //$("body").append(button);

        Start();

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
}
//window.CurrentApp.App = App;
//


class InstanceLoader {
    constructor(private context: Object) {

    }

    getInstance(name: string, ...args: any[]) {
        var instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }
}