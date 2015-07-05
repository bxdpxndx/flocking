export function rand(min, max) {
	return Math.random() * (max - min + 1) + min;
};

export var mouse = {x: 0, y: 0};
window.addEventListener('mousemove', function (event) {
	mouse.x = event.offsetX || event.clientX;
	mouse.y = event.offsetY || event.clientY;
});

export function setCanvasFullscreen(canvas, ctx) {
	var devicePixelRatio = window.devicePixelRatio || 1;
	var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
	    ctx.mozBackingStorePixelRatio ||
	    ctx.msBackingStorePixelRatio ||
	    ctx.oBackingStorePixelRatio ||
	    ctx.backingStorePixelRatio || 1;
	var ratio = devicePixelRatio / backingStoreRatio;

	canvas.height = ratio * window.innerHeight;
	canvas.width = ratio * window.innerWidth;
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth;
	ctx.scale(ratio, ratio);
};
