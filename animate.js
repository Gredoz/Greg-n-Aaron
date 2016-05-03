var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var ballArray = [];
var possibleColors = ["red", "green", "blue", "yellow", "orange", "purple"];
var possibleColors2 = ["#e6ffee", "#ccffdd", "#b3ffcc", "#99ffbb", "#80ffaa", "#66ff99", "#4dff88", "#33ff77", "#1aff66", "#00ff55", "#00e64d", "#00cc44", "#00b33c", "#009933", "#00802b", "#006622", "#004d1a"];

var getColor = function() {
    index = Math.floor(Math.random()*possibleColors2.length);
    return possibleColors2[index];
};

var getSpeed = function() {
    change = Math.floor(Math.random()*10)-5;
    if (change == 0) {
	change += 1;
    };
    return change;
};

var ballMaker = function() {
    var xpos = Math.floor(Math.random()*(c.width-100))+50;
    var ypos = Math.floor(Math.random()*(c.height-100))+50;
    var xchange = getSpeed();
    var ychange = getSpeed();
    var radius = Math.floor(Math.random()*30)+10;
    var color = getColor();

    var setxchange = function(n){
	//console.log(xchange);
	xchange = n;
	//console.log(xchange);
    }

    var setychange = function(n){
	ychange = n;
    }

    var move = function() {

	if (xpos >= c.width-radius || xpos <= radius) {
	    xchange *= -1;
	}
	if (ypos >= c.height-radius || ypos <= radius) {
	    ychange *= -1;
	}
	//console.log(xchange);
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
	setxchange:setxchange,
	setychange:setychange,
	radius:radius,
	color:color,
	move:move
    };
};

var collide = function() {
    for (i = 0; i < ballArray.length - 1; i++) {
	for (j = i + 1; j < ballArray.length; j++) {
	    dx = ballArray[i].xpos - ballArray[j].xpos;
	    dy = ballArray[i].ypos - ballArray[j].ypos;
	    dist = Math.sqrt( (dx*dx) + (dy*dy) );
	    if (dist <= (ballArray[i].radius + ballArray[j].radius)) {
		ballArray[i].xchange *= -1;
		ballArray[i].ychange *= -1;
		ballArray[j].xchange *= -1;
		ballArray[j].ychange *= -1;
	    };
	};
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

var flock = function(){
    //console.log('flock');
    ballArray.map(function(ball){
        ball.setxchange(2);
	ball.setychange(2);
        return ball;
    });
}

var filterS = function(){
    //console.log('filtering');
    ballArray.filter(function(ball){
	//console.log(ball.radius);
	return ball.radius < 20;
    }).map(function(ball){
	ball.setxchange(0);
	ball.setychange(0);
    });
};

b1button = document.getElementById("add1");
b1button.addEventListener("click", add1Ball);

b5button = document.getElementById("add5");
b5button.addEventListener("click", add5Ball);

b10button = document.getElementById("add10");
b10button.addEventListener("click", add10Ball);

rbutton = document.getElementById("remove");
rbutton.addEventListener("click", removeBall);

cbutton = document.getElementById("clear");
cbutton.addEventListener("click", clearBall);

fbutton = document.getElementById("flock");
fbutton.addEventListener("click", flock);

lbutton = document.getElementById("filter");
lbutton.addEventListener("click", filterS);

window.requestAnimationFrame(moveAll);
