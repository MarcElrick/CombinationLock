function pointsToRotation(x1, y1, x2, y2) {
	const
	m1 = (screen_radius - y1) / (screen_radius - x1);
	const
	m2 = (screen_radius - y2) / (screen_radius - x2);
	const
	tanTheta = (m2 - m1) / (1 + m2 * m1);
	return Math.atan(tanTheta)
}

function rotationToValue(numTicks, rotation) {
	value = -Math
			.round((((rotation - (3 * Math.PI / 2)) % (2 * Math.PI)) * numTicks)
					/ (2 * Math.PI))
			% numTicks

	if (value < 0)
		value += 20
	return value
}

function submitValue() {
	enteredPassword.push(rotationToValue(global_ticks, rotation))
	console.log(enteredPassword)
}