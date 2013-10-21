define(function (require) {
    var easel     = require('easel');
    var Matrix3D  = require('Matrix3D');
    var Mesh      = require('Mesh');
    var Point2D   = require('Point2D');
    var Point3D   = require('Point3D');
    var Surface3D = require('Surface3D');
    var Triangle  = require('Triangle');


    function Main() {
        this.surface3D         = {};
        this.matriceDeRotation = [];
        this.mesh              = new Mesh();
        this.points            = [];
        this.triangles         = [];
        this.container         = {};
        this.centerX           = 0;
        this.centerY           = 0;
        this.pitch             = 300;
        this.yaw               = 300;
        this.roll              = 200;
        this.a3DObjects        = [];
        this.primitiveName     = [];
        this.primitive         = 0;
        this.playState         = true;


        this.init = function() {
            var self = this;

            $('#playPause').on('click', function (e) {
                self.playState = !self.playState;
                self.playState ? $(this).text('pause') : $(this).text('play');
            });

            this.stage = new createjs.Stage("canvasID");
            this.container = new createjs.Shape();
            // container.shadow = new createjs.Shadow("#999999", 5, 5, 10);
            this.stage.addChild(this.container);

            this.centerX = (this.stage.canvas.width)  >> 1;
            this.centerY = (this.stage.canvas.height) >> 1;

            this.putObjectToScene($('#primitives').val());
        };

        this.handleTick = function () {
            if(this.playState) {
                this.matriceDeRotation.setAngle((this.pitch - this.centerY) / 50);
                this.mesh.transformMesh(this.matriceDeRotation.pitch);
        
                this.matriceDeRotation.setAngle(-(this.yaw - this.centerX) / 50);
                this.mesh.transformMesh(this.matriceDeRotation.yaw);
                    
                this.matriceDeRotation.setAngle(this.roll / 250);
                this.mesh.transformMesh(this.matriceDeRotation.roll);
                
                this.surface3D.render();

                this.stage.update();

                $('#fpsCounterNb').text(createjs.Ticker.getMeasuredFPS().toFixed(3));
                
                this.container.graphics.clear();
            }
        };

        this.make3DObjects = function (jsonData) {          
            var keys = _.keys(jsonData);
            this.primitiveName = keys;
            
            for (var i in keys) {
                var tempObj3D = _.keys(jsonData)[i]; // object of this kind : {"points":[...], "triangles":[...]}
                var pointsJSON = jsonData[tempObj3D].points; // [[x,y,z], [x,y,z],...]
                var trianglesJSON = jsonData[tempObj3D].triangles; // [[a,b,c,color], [a,b,c,color],...]
                var pointsTmp = [];
                var trianglesTmp = [];

                for (var n in pointsJSON) {
                    pointsTmp.push(new Point3D(pointsJSON[n][0], pointsJSON[n][1], pointsJSON[n][2]));
                }

                for (var m in trianglesJSON) {
                    trianglesTmp.push(new Triangle(
                        pointsTmp[ trianglesJSON[m][0] ],
                        pointsTmp[ trianglesJSON[m][1] ],
                        pointsTmp[ trianglesJSON[m][2] ],
                        trianglesJSON[m][3]));
                }

                this.a3DObjects.push({points: pointsTmp, triangles: trianglesTmp});
            }
        };

        this.makeControls = function () {
            this.createSelectButton();
            this.setUpControls();
        };

        this.createSelectButton = function () {
            var self = this;
            var $primitives = $('#primitives');
            for (var i in this.primitiveName) {
                var option = $('<option name="'+this.primitiveName[i]+'">'+this.primitiveName[i]+'</option>');
                $primitives.append(option);
            }
            $primitives.on('change', function (e) {
                e.preventDefault();
                var val = $(this).val();
                self.putObjectToScene(val);
            });
        };

        this.setUpControls = function () {
            var self = this;

            $('#focalSlider').on('change', function (e) {
                self.mesh.changeFocal(parseInt($(this).val()));
            });

            $('#zOffsetSlider').on('change', function (e) {
                self.mesh.changeOffsetZ(parseInt($(this).val()));
            });

            $('#pitchSlider').on('change', function (e) {
                self.pitch = (parseInt($(this).val()));
            });

            $('#yawSlider').on('change', function (e) {
                self.yaw = (parseInt($(this).val()));
            });

            $('#rollSlider').on('change', function (e) {
                self.roll = (parseInt($(this).val()));
            });
        };

        this.putObjectToScene = function (name) {
            this.surface3D = new Surface3D();
            this.matriceDeRotation = new Matrix3D();

            this.primitive = this.primitiveName.indexOf(name);

            this.mesh = new Mesh();
            this.mesh.setMesh(this.a3DObjects[this.primitive].points, this.a3DObjects[this.primitive].triangles);

            this.surface3D.setContainer(this.container);
            this.surface3D.addmesh(this.mesh);

            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", this.closure(this.handleTick, this)); // this.closure() is need to not lose scope
            // createjs.Ticker.addEventListener("tick", this.handleTick);
        };

        this.closure = function (listener, context) {
            return function () {
                listener.call(context);
            }
        };
    }
    return Main;
});