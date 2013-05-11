define( function () {

	function Surface3D() {

		this.meshes = [];
		this.container;
	}

	Surface3D.prototype.render = function () {
			for (var i=0; i<this.meshes.length; i+=1) {
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

