import Boid from './Boid';

export default class Game {
	constructor(canvas) {
		this.canvas = canvas;
		let flock = new Set()
		for(let i = 0; i < 150; i ++) {
			flock.add(Boid.random(flock));	
		}
		this.flock = flock;
	}

	update(interval) {
		for (let boid of this.flock) {
			boid.update(interval);
		}
	}

	render(ctx) {
		for (let boid of this.flock) {
			boid.render(ctx);
		}
	}
}