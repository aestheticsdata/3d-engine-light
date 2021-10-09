require.config({
    baseUrl: 'js/classes',
    paths: {
        'jquery': [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
            '../libs/jquery-1.9.1.min' // path fallback
        ],
        'lodash': '../libs/lodash.min',
        'easel': '../libs/easeljs-1.0.0.min'
    },
    shim: {
        'easel': {
            exports: 'createjs'
        }
    }
});

require(["jquery", "lodash", "StartupSequence", "Main"], 
function ($,        _,        StartupSequence,   Main) { 

    $(function () {
        var StartSeq = new StartupSequence();

        function onStartupCompleted() {
            var main = new Main();
            main.make3DObjects(StartSeq.jsonDS.jsonVO.jsonData);
            main.makeControls();
            main.init();
        }

        StartSeq.startupCompleted.add(onStartupCompleted);
        StartSeq.start();
    });
});
