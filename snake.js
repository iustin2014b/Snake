
let stackTraceTail= [];
let lengthTail;
let canvas = document.getElementById("area");
let context = canvas.getContext("2d");
let xSnakeHead = 5;
let ySnakeHead = 5
let areaWidth = 20;
let areaHeight = 20;
let gridSizeX = 20;
let gridSizeY = 20;
let keyPressed = "0";
let xFood = 0,yFood = 0;
let keepSizeStack = 1;
let statusGame = "init";

let interval = setInterval(moveSnake, 500);

function moveSnake() {	
	changeHeadPosition()
	checkFoodTouch();
	checkBorderCollision() 
	checkItselfBodyCollision() 
	stackSnakeTailShift();	
	drawSnake();
	drawFood();
}

function changeHeadPosition() {
	if (statusGame != "end") {
		if (keyPressed == "R") {
			if (xSnakeHead < areaWidth)
				xSnakeHead += 1;
		} else if (keyPressed == "L") {
			if (xSnakeHead >= 0)
				xSnakeHead -= 1;
		} else if (keyPressed == "U") {
			if (ySnakeHead >= 0)
				ySnakeHead -= 1;
		} else if (keyPressed == "D") {
			if (ySnakeHead < areaHeight )
				ySnakeHead += 1;
		}else{
			printMsg("Press only arrow key !");
			if (statusGame == "init")
				printMsg("Push an arrow key to start game !");
			return;
		}
		printMsg("Move snake to food place !");
		statusGame = "run";
	}
}

function checkBorderCollision() {
	//check colision with border
	isBorderColision = 0;
	if 	((xSnakeHead >= areaWidth ) || 
		(ySnakeHead >= areaHeight ) ||
 		(xSnakeHead < 0) ||
		(ySnakeHead < 0))
			isBorderColision = 1;
	if (isBorderColision == 1) {	
			printMsg("Border collision!")
			statusGame = "end";
		}	
}

function checkItselfBodyCollision() {
	//check colision with body
	isBodyColision = 0;
	for (let  i = 0; i < lengthTail-1; i++) {
		if (stackTraceTail[i].xPos == xSnakeHead  &&  stackTraceTail[i].yPos == ySnakeHead)
			isBodyColision = 1;
	}
	if (isBodyColision == 1 ) {
		keyPressed= "0";
		printMsg("Body collision!");
		statusGame = "end";
	}
}

function checkFoodTouch() {
	if (xFood == xSnakeHead && yFood == ySnakeHead ) {
		keepSizeStack = 0 ;
		xFood = randomGenerator(areaWidth - 2, 2);
		yFood = randomGenerator(areaHeight - 1, 1);
	}
}
function drawSnake() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let  i = 0; i < lengthTail; i++) {
		context.fillStyle = "green";  		 //tail color
		if ( i == lengthTail -1 )
			context.fillStyle = "limegreen"; //head color
		context.fillRect(stackTraceTail[i].xPos * gridSizeX, stackTraceTail[i].yPos * gridSizeY,gridSizeX, gridSizeY);

	}
}

function drawFood() {
	if (xFood == 0 && yFood == 0){
		xFood = randomGenerator(areaWidth - 2, 2);
		yFood = randomGenerator(areaHeight - 2, 2);
	}
	context.fillStyle = "red";
	context.fillRect(xFood * gridSizeX, yFood * gridSizeY, gridSizeX, gridSizeY);
}

function stackSnakeTailShift(){
	//shift trace
	lengthTail = stackTraceTail.length;
	if  (statusGame == "init")
		if (lengthTail == 0)
			stackTraceTail.push({xPos : xSnakeHead, yPos : ySnakeHead});
	if (statusGame == "run") {
		stackTraceTail.push({xPos : xSnakeHead, yPos : ySnakeHead});
		if (keepSizeStack == 1 ) {
			stackTraceTail.shift();
		} else
			keepSizeStack = 1;
	}
	lengthTail = stackTraceTail.length;
}


document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
	if (statusGame == "end") 
		return;
	if (e.key == "Right" || e.key == "ArrowRight") {
		keyPressed = "R";
	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		keyPressed = "L";
	} else if (e.key == "Up" || e.key == "ArrowUp") {
		keyPressed = "U";
	} else if (e.key == "Down" || e.key == "ArrowDown") {
		keyPressed = "D";
	}
}

function onBtnReset(){
	statusGame = "init";
	keyPressed = "0";
	stackTraceTail.length = 0;
	lengthTail = stackTraceTail.length;
	xSnakeHead = 5;
	ySnakeHead = 5;
	xFood = 0;
	yFood = 0;
}

function randomGenerator(nbMaxim, nbMinim){
	nbRandom = Math.floor((Math.random() * (nbMaxim - nbMinim))) + nbMinim;
	return nbRandom;
}

function printMsg(sMsg) {
	document.getElementById("msgBottom").innerHTML = sMsg;	
}

