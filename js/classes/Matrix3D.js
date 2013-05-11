define( function () {

	function Matrix3D() {

		this.roll  = [];
		this.pitch = [];
		this.yaw   = [];
		this.id    = [];
		
		var cos = 0, 
			sin = 0, 
			agl = 0; // radian angle
		
		this.setMatrix3D = function () {
			
			this.roll  = [[cos, -sin, 0, 0],
					      [sin,  cos, 0, 0],
					      [0,    0  , 1, 0],
					      [0,    0  , 0, 1]];		
		
			this.pitch = [[1,  0  ,  0  , 0],
					      [0,  cos, -sin, 0],
					      [0,  sin,  cos, 0],
					      [0,  0  ,  0  , 1]];
		
			this.yaw   = [[ cos, 0,  sin, 0],
					      [ 0  , 1,  0  , 0],
					      [-sin, 0,  cos, 0],
					      [ 0  , 0,  0  , 1]];
		};
		
		this.setAngle = function (agl) {

			agl = agl * (Math.PI/180);
			cos = Math.cos(agl);
			sin = Math.sin(agl);
			this.setMatrix3D();
		};
	}

	return Matrix3D;
});

	