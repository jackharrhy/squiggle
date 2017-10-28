var Squiggle = (function() {
	var defaults = {
		canvas: 'squiggleCanvas',
		height: 100,
		container: 'squiggleContainer',
		width: document.body.offsetWidth,
		frameInterval: 1
	};

	var props = {};

	var stopSquiggling = false;
	var squiggled = false;

	function init() {
		var canvas = props.canvas ? props.canvas : defaults.canvas;
		canvas = document.getElementById(canvas);
		canvas.height = props.height ? props.height : defaults.height;

		var c = canvas.getContext('2d');

		var container = props.container ? props.container : defaults.container;
		container = document.getElementById(container);

		var width = props.width ? props.width : defaults.width;

		var frameInterval = props.frameInterval ? props.frameInterval: defaults.frameInterval;
		var frame = -1;

		var loopy = function() {
			frame += frameInterval;

			canvas.width = container.offsetWidth;

			c.clearRect(0,0,canvas.width,canvas.height);

			for(var i=0; i<=window.innerWidth/2; i++) {
				c.fillStyle = 'rgba('+
					String(Math.ceil(Math.sin(frame/4 + i/2)*100) + 155)+','+
					String(Math.ceil(Math.cos(frame/5 + i/2.5)*100) + 155)+','+
					String(Math.ceil(Math.sin(frame/6 + i/3)*100) + 155)+','+
					String(1)+')';

				c.fillRect(
					i * 2,
					50 +
					(Math.cos((frame+i)/60)*30)*
					Math.sin((frame-i)/30)+
					Math.cos((frame+i))/10,
					2,
					2);
			}

			if(!stopSquiggling) {
				window.requestAnimationFrame(loopy);
			}
		}

		loopy();
	}

	return {
		tell: function(args) {
			if(args) {
				props = args;
			} else {
				props = {};
			}
		},
		wiggle: function(args) {
			if(!squiggled) {
				init();
			} else {
				stopSquiggling = false;
			}
		},
		calm: function(args) {
			stopSquiggling = true;
		}
	};
})();

var wormy = Squiggle;

document.addEventListener('DOMContentLoaded', function() {
	wormy.tell();
	wormy.wiggle();
});

