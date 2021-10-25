const
global_ticks = 20;
var rotation = 3 / 2 * Math.PI;
const
screen_radius = 180;

const
selectionModes = {
	PAUSE : 'pause',
	TAP : 'tap',
	DIRECTION : 'direction',
};

const
directions = {
	CLOCKWISE : 'clockwise',
	ANTICLOCKWISE : 'anticlockwise',
};

var selectionMethod = selectionModes.DIRECTION;
var global_direction = directions.CLOCKWISE;

window.onload = function() {
	// TODO:: Do your initialization job
	document.addEventListener('rotarydetent', onBezelRotate)
	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName == "back")
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
	});

	init_canvas()
	init_touch_handler();
	update_canvas(global_ticks)

};