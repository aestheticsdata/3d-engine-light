define(function () {
	
	function Mesh() {

		this.points    = [];
		this.triangles = [];
	}

	Mesh.prototype.render = function (container) {

		for (var i=0; i<this.triangles.length; i++) {
			this.triangles[i].render(container);
		}
	};

	Mesh.prototype.changeFocal = function (value) {
		for (var i=0; i<this.triangles.length; i++) {
			this.triangles[i].changeFocal(value);
		}
	};

	Mesh.prototype.changeOffsetZ = function (value) {
		for (var i=0; i<this.triangles.length; i++) {
			this.triangles[i].changeOffsetZ(value);
		}
	}

	Mesh.prototype.transformMesh = function (rot) {
		for (var i=0; i<this.points.length; i++) {
			this.points[i].transformPt(rot);
		}
	};

	Mesh.prototype.setMesh = function (points, triangles) {
		
		for (var i=0; i<points.length; i++) {
			this.points[i] = points[i];
		}
		
		for (var i=0; i<triangles.length; i++){
			this.triangles[i] = triangles[i];
		}
	};

	return Mesh;
});
