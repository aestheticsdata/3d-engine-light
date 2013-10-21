define(function (require) {
    var Signals = require('../../libs/signals.min');
    var Vo      = require('services/vo/JsonDataVO');

    function JsonDataService() {
        this.loaded = new Signals.Signal();
        this.jsonVO = new Vo();
        this.startSeq = {};
    }

    JsonDataService.prototype.getJson = function () {
        self = this;

        $.getJSON('data/data.json', function (data) {
            self.jsonVO.setData(data);
            self.loaded.dispatch();
        });
    };

    return JsonDataService;
});