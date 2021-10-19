var canvas;
var context;
const screen_radius = 180;
var rotation = 3 / 2 * Math.PI;
var selectedVal = 0

function init_canvas() {
    canvas = document.getElementById('canvas');
    canvas.height = 360;
    canvas.width = 360;
    context = canvas.getContext('2d');
}

function update_canvas(numTicks) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawTickCircles(numTicks)
    drawTickLabels(numTicks)
    drawPointer()
}

function drawTickCircles(numTicks) {
    const dot_radius = screen_radius * 15 / 20;
    var t;
    for (var i = 0; i < numTicks; i++) {
        t = (2 * Math.PI * i) / numTicks;
        var x = screen_radius + dot_radius * Math.cos(t + rotation)
        var y = screen_radius + dot_radius * Math.sin(t + rotation)

        drawCircle(5, x, y, context);
    }
    
    drawBarrierCircle()
}

function drawTickLabels(numTicks) {
    context.fillStyle = 'white';
    context.font = '20px Arial'
    context.textAlign = 'center'
    var t;
    const text_radius = screen_radius * 18 / 20
    for (var i = 0; i < numTicks; i++) {
        t = (2 * Math.PI * i) / numTicks;
        var x = screen_radius + text_radius * Math.cos(t + rotation)
        var y = screen_radius + text_radius * Math.sin(t + rotation) + 10

        context.fillText(i, x, y)
    }


    // Draw center label
    context.font = '50px Arial'
    selectedVal = rotationToValue(numTicks, rotation);
    context.fillText(selectedVal, screen_radius, screen_radius + 25);
}

function drawBarrierCircle(){
    context.beginPath();
    context.arc(screen_radius, screen_radius, 90, 0, 2 * Math.PI, false);
    
    context.lineWidth = 5;
    context.strokeStyle = 'white';
    context.stroke();
}


function drawCircle(radius, x, y) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'cyan';
    context.fill();
 }

function drawPointer() {
    context.fillStyle = 'red'
    context.beginPath();
    context.moveTo(screen_radius, screen_radius * 7 / 20);
    context.lineTo(screen_radius + 10, screen_radius * 9 / 20);
    context.lineTo(screen_radius - 10, screen_radius * 9 / 20);
    context.lineTo(screen_radius, screen_radius * 7 / 20);

    context.fill();
}