export function rand(min, max) {
	return Math.random() * (max - min + 1) + min;
};


export let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', function (event) {
	mouse.x = event.offsetX || event.clientX;
	mouse.y = event.offsetY || event.clientY;
});

export function setCanvasFullscreen(canvas, ctx) {
	let devicePixelRatio = window.devicePixelRatio || 1;
	let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
	    ctx.mozBackingStorePixelRatio ||
	    ctx.msBackingStorePixelRatio ||
	    ctx.oBackingStorePixelRatio ||
	    ctx.backingStorePixelRatio || 1;
	let ratio = devicePixelRatio / backingStoreRatio;

	console.log("ratio:", ratio)
	canvas.height = ratio * window.innerHeight;
	canvas.width = ratio * window.innerWidth;
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth;
	ctx.scale(ratio, ratio);
};
