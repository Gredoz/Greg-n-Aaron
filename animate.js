var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var ballArray = [];
var possibleColors = ["red", "green", "blue", "yellow", "orange", "purple"];

var getColor = function() {
    index = Math.floor(Math.random()*possibleColors.length);
    return possibleColors[index];
};


var ballMaker = function() {
    var xpos = Math.floor(Math.random()*(c.width-100))+50;
    var ypos = Math.floor(Math.random()*(c.height-100))+50;
    var xchange = Math.floor(Math.random()*10)-5;
    var ychange = Math.floor(Math.random()*10)-5;
    var radius = Math.floor(Math.random()*30)+10;
    var color = getColor();

    var move = function() {
	if (xpos >= c.width-radius || xpos <= radius) {
	    xchange *= -1;
	}
	if (ypos >= c.height-radius || ypos <= radius) {
	    ychange *= -1;
	}
	xpos += xchange;
	ypos += ychange;
	ctx.beginPath();
	ctx.arc(xpos,ypos,radius,0,Math.PI * 2);
	ctx.fillStyle=color;
	ctx.fill();	
	ctx.stroke();
    }
    
    return {
	xpos:xpos,
	ypos:ypos,
	xchange:xchange,
	ychange:ychange,
	radius:radius,
	color:color,
	move:move
    };
};

var moveAll = function() {
    counter = 0;
    ctx.clearRect(0,0,c.width,c.height);
    while (counter < ballArray.length){
	ballArray[counter].move();
	counter ++;
    }
    window.requestAnimationFrame(moveAll);
};

var add1Ball = function() {
    newBall = ballMaker();
    ballArray.push(newBall);
};

var add5Ball = function() {
    for (i = 0; i < 5; i++) {
	newBall = ballMaker();
	ballArray.push(newBall);
    };
};

var add10Ball = function() {
    for (i = 0; i < 10; i++) {
	newBall = ballMaker();
	ballArray.push(newBall);
    };
};

var removeBall = function() {
    ballArray.pop();
};

var clearBall = function() {
    ballArray = [];
};

bbutton = document.getElementById("add1");
bbutton.addEventListener("click", add1Ball);

bbutton = document.getElementById("add5");
bbutton.addEventListener("click", add5Ball);

bbutton = document.getElementById("add10");
bbutton.addEventListener("click", add10Ball);

dbutton = document.getElementById("remove");
dbutton.addEventListener("click", removeBall);

cbutton = document.getElementById("clear");
cbutton.addEventListener("click", clearBall);

window.requestAnimationFrame(moveAll);
