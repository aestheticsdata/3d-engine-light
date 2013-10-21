define(function () {

    function JsonDataVO() {
        this.jsonData = {};
    }

    JsonDataVO.prototype.setData = function (data) {
        this.jsonData = data;
    };

    JsonDataVO.prototype.getData = function ()  {
        return this.jsonData;
    };

    return JsonDataVO;
});