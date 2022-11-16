class Point {
	
	constructor(x, y, xv, yv) {
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
	}

	draw() {
		ctx.beginPath(); // this begin and close path is important to having a moving point 
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
		ctx.closePath(); // instead of just drawing a new point in each frame
		ctx.fillStyle = "rgba(0, 0, 155, 0.5)";
		ctx.fill();
	}
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function init() {

	let pList = [];

	for(let i=0; i<50; i++) {
		let newPoint = new Point(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), 
									Math.random() * 0.5 + -(Math.random() * 0.5), 
									Math.random() * 0.5 + -(Math.random() * 0.5));
		pList.push(newPoint);
	}

	window.requestAnimationFrame(() => {
		animate(pList);
	});
}

function animate(points) {

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	for(p in points) {
		for(pi in points) {
			if(p != pi) {
				distance = Math.abs(points[p].x - points[pi].x) + Math.abs(points[p].y - points[pi].y);

				if(distance < 80) {
					ctx.moveTo(points[p].x, points[p].y)
					ctx.lineTo(points[pi].x, points[pi].y)
					ctx.strokeStyle = "rgba(0, 0, 255, 0.1)";
					ctx.stroke();
				}
			}
		}
	}

	for(p in points) {
		points[p].x += points[p].xv;
		points[p].y += points[p].yv;

		if(points[p].x > canvas.width || points[p].x < 0) {
			points[p].xv *= -1;
		}

		if(points[p].y > canvas.height || points[p].y < 0) {
			points[p].yv *= -1;
		}	

		points[p].draw();

	}

	window.requestAnimationFrame(() => {
		animate(points);
	});
}

init();
