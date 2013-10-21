define(function () {

    function Surface3D() {

        this.meshes = [];
        this.container;
    }

    Surface3D.prototype.render = function () {
        for (var i in this.meshes) {
            this.meshes[i].render(this.container);
        }
    };

    Surface3D.prototype.addmesh = function (mesh) {
        this.meshes.push(mesh);
    };

    Surface3D.prototype.setContainer = function (container) {
        this.container = container;
    };

    return Surface3D;
});

