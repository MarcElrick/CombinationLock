var hasBeenTouched = false
var previousX = 0
var previousY = 0

var centerTouched = false
var enteredPassword = []

function init_touch_handler() {
	var canvas = document.getElementById('canvas');
	canvas.addEventListener("touchmove", onMove, false);
	canvas.addEventListener("touchstart", onDown, false)
	canvas.addEventListener("touchend", onUp, false)
}

function onMove(event) {
	event.preventDefault();

	if (!touchInRange(event)) {
		return	
	}
	const
	newX = event.changedTouches[0].pageX;
	const
	newY = event.changedTouches[0].pageY;

	if (!hasBeenTouched) {
		previousX = newX;
		previousY = newY;
		hasBeenTouched = true
	}

	var angleToRotate = pointsToRotation(previousX, previousY, newX, newY);

	rotation += angleToRotate;

	var newDirection;

	if (angleToRotate < 0) {
		new_direction = directions.CLOCKWISE;
	} else {
		new_direction = directions.ANTICLOCKWISE;
	}

	if (new_direction !== global_direction
			&& selectionMethod === selectionModes.DIRECTION) {
		submitValue()
		global_direction = new_direction;
	}

	previousX = event.changedTouches[0].pageX
	previousY = event.changedTouches[0].pageY
	update_canvas(global_ticks);
}

function onDown(event) {
	event.preventDefault();
	hasBeenTouched = false

	if (!touchInRange(event)) {
		centerTouched = true
	}
}

function onUp(event) {
	event.preventDefault();
	if (!touchInRange(event) && selectionMethod === selectionModes.TAP) {
		submitValue();
	}
	centerTouched = false;
}

function touchInRange(event) {
	const
	x = event.changedTouches[0].pageX - screen_radius;
	const
	y = event.changedTouches[0].pageY - screen_radius;

	return Math.sqrt(x * x + y * y) > 90

}

function onBezelRotate(ev) {
	var direction = ev.detail.direction;
	var new_direction;
	
	if (direction == 'CW') {
		new_direction = directions.CLOCKWISE
		rotation -= Math.PI / global_ticks
	} else if (direction == 'CCW') {
		rotation += Math.PI / global_ticks
		new_direction = directions.ANTICLOCKWISE
	}
	
	if (new_direction !== global_direction
			&& selectionMethod === selectionModes.DIRECTION) {
		submitValue()
		global_direction = new_direction;
	}

	update_canvas(global_ticks)
}
