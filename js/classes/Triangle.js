define( function () {

		function Triangle(a, b, c, color) { //a, b, c are Point3D

		this.a = a;
		this.b = b;
		this.c = c;
		this.color = color;

		var aproj, // aproj is a Point2D
			bproj, // bproj is a Point2D
			cproj; // cproj is a Point2D

		this.render = function (container) {
			
			aproj = this.a.convert3D2D(); 
			bproj = this.b.convert3D2D(); 
			cproj = this.c.convert3D2D(); 

			container.graphics.beginFill(this.color);
			container.graphics.moveTo(aproj.x, aproj.y);
			container.graphics.lineTo(bproj.x, bproj.y);
			container.graphics.lineTo(cproj.x, cproj.y);
			container.graphics.lineTo(aproj.x, aproj.y);
			container.graphics.endFill();
		};

		Triangle.prototype.changeFocal = function (value) {
			this.a.fl = this.b.fl = this.c.fl = value;
		};

		Triangle.prototype.changeOffsetZ = function (value) {
			this.a.zOffset = this.b.zOffset = this.c.zOffset = value;
		}
	}

	return Triangle;
});

