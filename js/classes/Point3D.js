define(["Point2D"], function (Point2D) {
    
    function Point3D(x, y, z) {

        // this.x = x;
        // this.y = y;
        Point2D.call(this, x, y);
        this.z = z;

        this.fl = 300;
        this.zOffset = 0;

        var vpX = $('canvas')[0].width  >> 1;
        var vpY = $('canvas')[0].height >> 1;
        var pt,
            tmpX,
            tmpY,
            scale,
            vect = [];

        this.convert3D2D = function () {
            scale = this.fl/(this.fl+this.z+this.zOffset);
            tmpX = vpX + this.x*scale;
            tmpY = vpY + this.y*scale;

            pt = new Point2D(tmpX, tmpY);
            return pt;
        };

        this.transformPt = function (rot) {
            vect[0] = rot[0][0] * this.x + rot[0][1] * this.y + rot[0][2] * this.z + rot[0][3] * 1;
            vect[1] = rot[1][0] * this.x + rot[1][1] * this.y + rot[1][2] * this.z + rot[1][3] * 1;
            vect[2] = rot[2][0] * this.x + rot[2][1] * this.y + rot[2][2] * this.z + rot[2][3] * 1;
            vect[3] = 1;
            
            this.x = vect[0];
            this.y = vect[1];
            this.z = vect[2];
        };
    }

    return Point3D;
});

