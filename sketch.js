
var num ; 
var springs = []; 
var particle_size = 2;
var offset = 10;
var input = 1;
function setup() {
	createCanvas(1500, 1500);
	noStroke();
  for (var u = 0; u < 100; u++) {
    for (var i = 0; i < 50; i++) {
      var index = i+(50*u)
      springs[index] = new Spring(100+(offset*u), 400+(offset*i), particle_size, 0.98, 8.0, 0.08, springs, index); 
    }
  }

	//springs[0] = new Spring(240, 260, 10, 0.88, 8.0, 0.08, springs, 0); 
	//springs[1] = new Spring(240, 210, 10, 0.88, 8.0, 0.08, springs, 1); 
	//springs[2] = new Spring(240, 170, 20, 0.98, 8.0, 0.1, springs, 2);
	num = springs.length;
}

function draw() {
	background(51); 
  
	for (var i = 0; i < num; i++) {
	  
	  if (input % 2) springs[i].pressed();
    if (!(input % 2)) springs[i].released();
		springs[i].update(); 
		springs[i].display();
	}
	if (input > width) input = 0;
	input +=1;
}

function mousePressed() {
  input = mouseX;
	for (var i = 0; i < num; i++) { 
		springs[i].pressed();
	}
}

function mouseReleased() {
	for (var i = 0; i < num; i++) { 
		springs[i].released();
	}
}

// Spring class
function Spring (_x, _y, _s, _d, _m, _k_in, _others, _id) {
	// Screen values 
	// this.xpos = _x;
	// this.ypos = _y;

  this.x_start = _x;
  this.y_start = _y;

	this.x_pos = _x;
	this.y_pos = _y;

	this.size = 20;
	this.size = _s; 

	this.over = true; 
	this.move = false; 

	// Spring simulation constants 
	this.mass = _m;       // Mass 
	this.k = 0.2;    // Spring constant 
	this.k = _k_in;
	this.damp = _d;       // Damping 
	this.damp_start = _d;
	this.damp_set;
	this.rest_posx = _x;  // Rest position X 
	this.rest_posy = _y;  // Rest position Y 

	// Spring simulation variables 
	//float pos = 20.0; // Position 
	this.velx = 0.0;   // X Velocity 
	this.vely = 0.0;   // Y Velocity 
	this.accel = 0;    // Acceleration 
	this.force = 0;    // Force 

	this.friends = _others;
	this.id = _id;

	this.update = function() {

		if (this.move) { 
			//this.rest_posy = height; 
			this.rest_posy -= 25; 
			this.rest_posx -= 25; 
			if (!this.damp_set) {
			  this.damp = this.damp_start - (abs(input - this.x_pos)*9/input);
			  
			  this.damp_set = true;
			}
			//
			this.rest_posx = mouseX;
			this.rest_posy = mouseY;
		}

		this.force = -this.k * (this.y_pos - this.rest_posy);  // f=-ky 
		this.accel = this.force / this.mass;                 // Set the acceleration, f=ma == a=f/m 
		this.vely = this.damp * (this.vely + this.accel);         // Set the velocity 
		this.y_pos = this.y_pos + this.vely;           // Updated position 


		this.force = -this.k * (this.x_pos - this.rest_posx);  // f=-ky 
		this.accel = this.force / this.mass;                 // Set the acceleration, f=ma == a=f/m 
		this.velx = this.damp * (this.velx + this.accel);         // Set the velocity 
		this.x_pos = this.x_pos + this.velx;           // Updated position 


		// if ((this.overEvent() || this.move) || (this.otherOver()) ) { 
		// 	this.over = true;
		// } else {
		// 	this.over = false;
		// }
	} 

// 	// Test to see if mouse is over this spring
// 	this.overEvent = function() {
// 		var disX = this.x_pos - mouseX;
// 		var disY = this.y_pos - mouseY;
// 		var dis = createVector(disX, disY);
// 		if (dis.mag() < this.size/2 ) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}

// 	// Make sure no other springs are active
// 	this.otherOver = function() {
// 		for (var i=0; i < num; i++) {
// 			if (i != this.id) {
// 				if (this.friends[i].over == true) {
// 					return true;
// 				}
// 			}
// 		}
// 		return false;
// 	}

	this.display = function() { 
		if (this.over) { 
			fill(153);
		} else { 
			fill(255);
		} 
		ellipse(this.x_pos, this.y_pos, this.size, this.size);
	} 

	this.pressed = function() { 
	  
		if (abs(input-this.x_pos) < 20) { 
		  
			this.move = true;
		} else { 
			this.move = false;
		}
	} 

	this.released = function() { 
		this.move = false; 
		this.damp = this.damp_start;
		this.damp_set = false;
		this.rest_posx = this.x_start;
		this.rest_posy = this.y_start;
	}
}
