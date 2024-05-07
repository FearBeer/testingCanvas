const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = "black";

let hue = 0;
let trigger = false;

function drawShape(x, y, radius, inset, n) {
    ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0,  0 - radius);

    for (let i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (radius * inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);
    };

    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
};

const radius = 100;
const inset = 0.5;
const numberOfSpikes = 20;
let angle = 0;

drawShape(100, 150, radius, inset, numberOfSpikes);

window.addEventListener("mousemove", function(event) {
    if (trigger) {
        ctx.save();
        ctx.translate(event.x, event.y);
        ctx.rotate(angle);
        hue += 3;
        angle += 1;
        drawShape(0, 0, radius, inset, numberOfSpikes);
        ctx.restore();
    }
});

window.addEventListener("mouseup", function(event) {
    trigger = false;
});

window.addEventListener("mousedown", function(event) {
    trigger = true;
});
