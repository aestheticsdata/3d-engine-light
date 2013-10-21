define(function () {
    
    function Mesh() {

        this.points    = [];
        this.triangles = [];
    }

    Mesh.prototype.render = function (container) {
        for (var i in this.triangles) {
            this.triangles[i].render(container);
        }
    };

    Mesh.prototype.changeFocal = function (value) {
        for (var i in this.triangles) {
            this.triangles[i].changeFocal(value);
        }
    };

    Mesh.prototype.changeOffsetZ = function (value) {
        for (var i in this.triangles) {
            this.triangles[i].changeOffsetZ(value);
        }
    }

    Mesh.prototype.transformMesh = function (rot) {
        for (var i in this.points) {
            this.points[i].transformPt(rot);
        }
    };

    Mesh.prototype.setMesh = function (points, triangles) {
        for (var i in points) {
            this.points[i] = points[i];
        }
        
        for (var i in triangles){
            this.triangles[i] = triangles[i];
        }
    };

    return Mesh;
});
