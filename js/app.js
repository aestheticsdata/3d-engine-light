require.config({
    paths: {
        classes: 'classes',
        'jquery': 'libs/jquery-1.9.1.min',
        'underscore': 'libs/underscore-min',
        'easel': 'libs/easeljs-0.6.0.min'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'easel': {
            exports: 'createjs'
        }
    }
});

require(
	["jquery", 
	 "underscore",
	 "easel",
	 "classes/Matrix3D",
	 "classes/Mesh",
	 "classes/Point2D",
	 "classes/Point3D",
	 "classes/Surface3D",
	 "classes/Triangle"], 
	 function ($, _, easel, Matrix3D, Mesh, Point2D, Point3D, Surface3D, Triangle) { 


	$( function () {

		console.log("ready");

		function canvasAvailable() {

			return Modernizr.canvas;
		}

		if (!canvasAvailable) return;

		var surface3D,
			matriceDeRotation,
			mesh,
			points = [],
			triangles = [],
			container,
			centerX,
			centerY,
			pitch = 300,
			yaw = 300,
			roll = 200,
			a3DObjects = [],
			primitiveName = [],
			primitive = 0,
			playState = true;


		function handleTick() {

			if(playState) {
				matriceDeRotation.setAngle((pitch - centerY) / 50);
				mesh.transformMesh(matriceDeRotation.pitch);
		
				matriceDeRotation.setAngle(-(yaw - centerX) / 50);
				mesh.transformMesh(matriceDeRotation.yaw);
					
				matriceDeRotation.setAngle(roll / 250);
				mesh.transformMesh(matriceDeRotation.roll);
				
				surface3D.render();

				stage.update();

				$('#fpsCounterNb').text(createjs.Ticker.getMeasuredFPS().toFixed(3));
				
				container.graphics.clear();
			}
		}

		window.requestAnimFrame = ( function () {
			return  window.requestAnimationFrame       || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function(/* function */ callback, /* DOMElement */ element){
						window.setTimeout(callback, 1000 / 60);
					};
		})();


		$.getJSON('data/data.json', function (data) {

			make3DObjects(data);
			makeControls();
			init();
		});

		function make3DObjects(jsonData) {
			
			var keys = _.keys(jsonData);
			primitiveName = keys;
			
			for (var i=0; i<keys.length; i+=1) {
				
				var tempObj3D = _.keys(jsonData)[i]; // object of this kind : {"points":[...], "triangles":[...]}
				var pointsJSON = jsonData[tempObj3D].points; // [[x,y,z], [x,y,z],...]
				var trianglesJSON = jsonData[tempObj3D].triangles; // [[a,b,c,color], [a,b,c,color],...]
				var pointsTmp = [];
				var trianglesTmp = [];

				for (var n=0; n<pointsJSON.length; n+=1) {
					pointsTmp.push(new Point3D(pointsJSON[n][0], pointsJSON[n][1], pointsJSON[n][2]));
				}

				for (var m=0; m<trianglesJSON.length; m+=1) {
					trianglesTmp.push(new Triangle(
						pointsTmp[ trianglesJSON[m][0] ],
						pointsTmp[ trianglesJSON[m][1] ],
						pointsTmp[ trianglesJSON[m][2] ],
						trianglesJSON[m][3]));
				}

				a3DObjects.push({points: pointsTmp, triangles: trianglesTmp});
			}
		}

		function makeControls() {

			createSelectButton();
			setUpControls();
		}

		function createSelectButton() {
			
			var $primitives = $('#primitives');
			for (var i=0; i<primitiveName.length; i++) {
				var option = $('<option name="'+primitiveName[i]+'">'+primitiveName[i]+'</option>');
				$primitives.append(option);
			}
			$primitives.on('change', function (e) {
				e.preventDefault();
				var val = $(this).val();
				putObjectToScene(val);
			});
		}

		function setUpControls() {

			$('#focalSlider').on('change', function (e) {
  				mesh.changeFocal(parseInt($(this).val()));
  			});

  			$('#zOffsetSlider').on('change', function (e) {
  				mesh.changeOffsetZ(parseInt($(this).val()));
  			});

  			$('#pitchSlider').on('change', function (e) {
  				pitch = (parseInt($(this).val()));
  			});

  			$('#yawSlider').on('change', function (e) {
  				yaw = (parseInt($(this).val()));
  			});

  			$('#rollSlider').on('change', function (e) {
  				roll = (parseInt($(this).val()));
  			});
		}

		function init() {

			$('#playPause').on('click', function (e) {
				playState = !playState;
				playState ? $(this).text('pause') : $(this).text('play');
			});

			stage = new createjs.Stage("canvasID");
			container = new createjs.Shape();
			// container.shadow = new createjs.Shadow("#999999", 5, 5, 10);
			stage.addChild(container);

			centerX = (stage.canvas.width)  >> 1;
			centerY = (stage.canvas.height) >> 1;

			putObjectToScene($('#primitives').val());
		}

		function putObjectToScene(name) {

			surface3D = new Surface3D();
			matriceDeRotation = new Matrix3D();

			primitive = primitiveName.indexOf(name);

			mesh = new Mesh();
			mesh.setMesh(a3DObjects[primitive].points, a3DObjects[primitive].triangles);

			surface3D.setContainer(container);
			surface3D.addmesh(mesh);

			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(30);
			createjs.Ticker.addEventListener("tick", handleTick);
			
		}
	});
});