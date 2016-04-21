var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var ballArray = [];
var bInterval;

var ballMaker = function() {
    var xpos = 10;
    var ypos = Math.floor(Math.random()*500);
    var xchange = Math.floor(Math.random()*5);
    var ychange = Math.floor(Math.random()*5);
    var radius = Math.floor(Math.random()*50);
    var color = "#FF0000";

    var move = function() {
	if (xpos == 500-radius || xpos == radius) {
	    xchange *= -1;
	}
	if (ypos == 500-radius || ypos == radius) {
	    ychange *= -1;
	}
	xpos += xchange;
	ypos += ychange;
	ctx.beginPath();
	ctx.arc(xpos,ypos,radius,0,Math.PI * 2);
	ctx.fillStyle="green";
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
    while (counter < ballArray.length){
	ballArray[counter].move();
    }
};

var addBall = function() {
    newBall = ballMaker();
    ballArray.push(newBall);
};

bbutton = document.getElementById("add");
bbutton.addEventListener("click", addBall);
