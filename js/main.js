const global_ticks = 20

window.onload = function() {
    // TODO:: Do your initialization job
	document.addEventListener('rotarydetent', onBezelRotate)
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName == "back")
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
    });

    init_canvas()
    init_touch_handler();
    update_canvas(global_ticks)

};