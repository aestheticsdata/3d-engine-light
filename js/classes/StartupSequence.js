define(function (require) {
    var 
        Signals         = require('../libs/signals.min'),
        JsonDataService = require('services/JsonDataService'),
        Modernizr       = require('../libs/modernizr-latest');

    function StartupSequence() {
        this.startupCompleted = new Signals.Signal();
        this.jsonDS           = {};
    };

    StartupSequence.prototype.canvasAvailable = function () {
        return Modernizr.canvas;
    };

    StartupSequence.prototype.start = function () {
        if (!this.canvasAvailable) return;
            
        window.requestAnimFrame = ( function () {
            return  window.requestAnimationFrame       || 
                    window.webkitRequestAnimationFrame || 
                    window.mozRequestAnimationFrame    || 
                    window.oRequestAnimationFrame      || 
                    window.msRequestAnimationFrame     || 
                    function(/* function */ callback, /* DOMElement */ element){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();

        function onJsonLoaded() {
            jsonDataService.startSeq.startupCompleted.dispatch();
        };

        var jsonDataService = new JsonDataService();
        this.jsonDS = jsonDataService;
        jsonDataService.startSeq = this; // we must pass 'this' as reference to jsonDataService because the onJsonLoaded Handler needs it. If we do not pass it, this == window
        jsonDataService.loaded.add(onJsonLoaded);
        jsonDataService.getJson();
    };

    return StartupSequence;
});