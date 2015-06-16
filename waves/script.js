String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
$.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
}

//--------------IMPORTANT---------
//"url_prefix" is the prefix for the home directory

function dummy(){};
var currentPopup;
func = {};

$(function (){


	var waves = []; // A wave is [x, y, radius, strength]
	for (var i = 0; i < 150; i++)
		waves[i] = [0, 0, 0, 0];
	function addWave(wv) {
		waves.shift();
		waves.push(wv);
		console.log(waves.length)
	}

	var shader_resized;
	var shader_failed = false;
	//header_shader_waves is defined in header.php

		//try {
			var canvas = document.getElementById("canvas");
			var renderer = new THREE.WebGLRenderer({ canvas: canvas });
			var uniforms = {
				time: { type: "f", value: 0.0 },
				resolution: { type: "v2", value: new THREE.Vector2() },
				waves: { type: "4fv", value: [] }
			};

			var material = new THREE.ShaderMaterial( {
				uniforms: uniforms,
				vertexShader: document.getElementById('shader-vert').textContent,
				fragmentShader: document.getElementById('shader-frag').textContent
			});
			var scene = new THREE.Scene();
			var camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, 1, 100 );
			var cW, cH;
			function onResized(w, h) {
				renderer.setViewport(0, 0, w, h);
				cW = w;
				cH = h;
			}
			shader_resized = onResized;
			scene.add( camera );

			var geometry = new THREE.PlaneBufferGeometry(1, 1);
			//material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 2;

			var startTime = Date.now();
			var lastTime = Date.now();
			function render() {
				//Update waves
				var currTime = Date.now();
				var delta = currTime - lastTime;
				lastTime = currTime;

				for (var i = 0; i < waves.length; i++) {
					waves[i][2] += delta / 25;
					if (waves[i][3] == 0)
						continue;
					//if (Math.min(0.8, 10 * waves[i][3] / Math.pow(waves[i][2], 1.5)) < 0.02)
					//	waves[i][3] = 0;
				}

				//Update uniforms
				uniforms.time.value = (Date.now() - startTime) / 1000.0;
				uniforms.resolution.value.set(cW, cH);
				uniforms.waves.value = [];
				for (var i = 0; i < waves.length; i++) {
					uniforms.waves.value[4*i] = waves[i][0];
					uniforms.waves.value[4*i+1] = cH - waves[i][1]; //flip Y for shader
					uniforms.waves.value[4*i+2] = waves[i][2];
					uniforms.waves.value[4*i+3] = waves[i][3];
				}
				requestAnimationFrame( render );
				renderer.render( scene, camera );
			}
			render();

		//}catch(err) {
		//	shader_failed = true;
		//	console.log(err.message);
		//}


	var resizeHandler = function() {
		var title_bg = document.getElementById("canvas");

		var oldCanvas = title_bg.toDataURL("image/png");
		var img = new Image();
		img.src = oldCanvas;
		img.onload = function (){
			title_bg.width = title_bg.parentNode.offsetWidth;
			title_bg.height = title_bg.parentNode.offsetHeight;

			if (!header_shader_waves || shader_failed) //This means that it is normal canvas
				title_bg.getContext("2d").drawImage(img, 0, 0);
			else if (shader_resized)
				shader_resized(title_bg.parentNode.offsetWidth, title_bg.parentNode.offsetHeight);

		}

	};
	$(window).resize(resizeHandler);
	resizeHandler();

	var fast_wave = false;
	var rand_wave = function() {
		var title_bg = document.getElementById("canvas");
		var w = title_bg.width;
		var h = title_bg.height;

		var x = 15 + (w - 30) * Math.random();
		var y = 15 + (h - 30) * Math.random();
		addWave([x, y, 4, 8 + Math.random(8)]);

		setTimeout(rand_wave, fast_wave ? 50 : (1500 + (Math.random() * 2000)));
	}
	setTimeout(rand_wave, 0);

	$("#canvas").on("click", function(e) { //Create wave on click
		var ev = e.originalEvent;
		addWave([ev.x, ev.y, 4, 8 + Math.random(8)]);
	});


	function popup(html) {
		var div = document.createElement("div");
		currentPopup = div;
		div.innerHTML = "<button id='popup-close-button' onclick='currentPopup.remove();'>Close</button><div>" + html + "</div>";
		div.id = "popup";
		document.body.appendChild(div);
		return function() {
			div.remove();
		};
	}
	func.popup = popup;



	resizeHandler();

});

function gotoPage(pg) {
	window.location = url_prefix + pg;

}























