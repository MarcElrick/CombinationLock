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
var global_direction = directions.CLOCKWISE;

function init_combination_lock() {
	clearEnteredPassword();

	init_canvas();
	init_touch_handler();
	update_canvas(getTicks());
	document.addEventListener('rotarydetent', onBezelRotate);
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName === "back")
			document.location.href = "index.html"
	});
}

function setSelectionMethod(method) {
	localStorage.setItem("selectionMethod", selectionModes[method]);

}

function getSelectionMethod() {
	return localStorage.getItem("selectionMethod")
}

function setTicks(tickNum) {
	return localStorage.setItem("globalTicks", tickNum)

}

function getTicks() {
	return localStorage.getItem("globalTicks")
}

function getEnteredPassword() {
	return localStorage.getItem("password").split(" ").map(function(val) {
		return parseInt(val)
	}).filter(function(val) {
		return !isNaN(val);})
}

function clearEnteredPassword() {
	localStorage.setItem("password", "");
}

function addValueToPassword(value) {
	var password = getEnteredPassword();
	password.push(value)
	localStorage.setItem("password", password.join(' '));
}
