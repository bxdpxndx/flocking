import Boid from './Boid';

export default class Game {
	constructor(canvas) {
		this.canvas = canvas;
		let flock = []
		for(let i = 0; i < 150; i ++) {
			flock.push(Boid.random(flock));	
		}
		this.flock = flock;
	}

	update(interval) {
		for (let i = 0; i < this.flock.length; i++) {
			let boid = this.flock[i];
			boid.update(interval);
		}
	}

	render(ctx) {
		for (let i = 0; i < this.flock.length; i++) {
			let boid = this.flock[i];
			boid.render(ctx);
		}
	}
}