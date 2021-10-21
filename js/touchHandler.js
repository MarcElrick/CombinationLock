var hasBeenTouched = false
var previousX = 0
var previousY = 0

function init_touch_handler() {
    var canvas = document.getElementById('canvas');
    canvas.addEventListener("touchmove", onMove, false);
    canvas.addEventListener("touchstart", onDown, false)
}

function onMove(event) {
    event.preventDefault();

    if(!touchInRange(event)){
    	return
    }
    const newX = event.changedTouches[0].pageX;
    const newY = event.changedTouches[0].pageY;

    if (!hasBeenTouched) {
        previousX = newX;
        previousY = newY;
        hasBeenTouched = true
    }

    var angleToRotate = pointsToRotation(previousX, previousY, newX, newY);

    rotation += angleToRotate;


    previousX = event.changedTouches[0].pageX
    previousY = event.changedTouches[0].pageY
    update_canvas(global_ticks);
}


function onDown(event) {
    event.preventDefault();
    hasBeenTouched = false
}

function touchInRange(event) {
    const x = event.changedTouches[0].pageX - screen_radius;
    const y = event.changedTouches[0].pageY - screen_radius;

    return Math.sqrt(x * x + y * y) > 90

}

function onBezelRotate(ev) {
    var direction = ev.detail.direction;

    if (direction == 'CW') {
        /* Add behavior for clockwise rotation */
        rotation -= Math.PI/global_ticks
    } else if (direction == 'CCW') {
        /* Add behavior for counter-clockwise rotation */
        rotation += Math.PI/global_ticks
    }
    
    update_canvas(global_ticks)
}
