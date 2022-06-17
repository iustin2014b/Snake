
let stackTraceTail= [];
let lengthTail;
let canvas = document.getElementById("area");
let context = canvas.getContext("2d");
let xSnak = 5;
let ySnak = 5
let areaWidth = 20;
let areaHeight = 20;
let gridSizeX = 20;
let gridSizeY = 20;
let keyPressed = "0";
let xFood = 0,yFood = 0;
let shiftStackTail = 1;
let statusGame = "init";

let interval = setInterval(moveSnake, 500);

function moveSnake() {	
	changePosition()
	checkBorderCollision() 
	checkItselfBodyCollision() 
	drawSnake();
	drawFood();
	if (statusGame == "run")  {
		checkFoodTouch();
		stackTailManagement();	
	}
}

function changePosition() {
	if (statusGame != "end") {
		if (keyPressed == "R") {
			if (xSnak < areaWidth - 1)
				xSnak += 1;
		} else if (keyPressed == "L") {
			if (xSnak > 0)
				xSnak -= 1;
		} else if (keyPressed == "U") {
			if (ySnak > 0)
				ySnak -= 1;
		} else if (keyPressed == "D") {
			if (ySnak < areaHeight - 1)
				ySnak += 1;
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
	if (xSnak >= areaWidth - 1)
		isBorderColision = 1;
	if (ySnak >= areaHeight - 1)
		isBorderColision = 1;
	if (xSnak <= 0)
		isBorderColision = 1;
	if (ySnak <= 0)
		isBorderColision = 1;
	if (isBorderColision == 1){	
			printMsg("Border collision!")
			statusGame = "end";
		}	
}

function checkItselfBodyCollision() {
	//check colision with body
	isBodyColision = 0;
	for (let  i = 0; i < lengthTail; i++) {
		if (Math.abs(stackTraceTail[i].xPos - xSnak) < 1 && Math.abs(stackTraceTail[i].yPos - ySnak) < 1)
			isBodyColision = 1;
	}
	if (isBodyColision == 1 ) {
		keyPressed= "0";
		printMsg("Body collision!");
		statusGame = "end";
	}
}

function checkFoodTouch() {
	if (Math.abs(xFood - xSnak) < 1 && Math.abs(yFood-ySnak) < 1){
		shiftStackTail = 0 ;
		//head draw
		context.fillStyle = "limegreen"; 
		context.fillRect(xFood * gridSizeX, yFood * gridSizeY, gridSizeX, gridSizeY);
		xFood = randomGenerator(areaWidth - 2, 2);
		yFood = randomGenerator(areaHeight - 1, 1);
		context.fillStyle = "red";
		context.fillRect(xFood * gridSizeX, yFood * gridSizeY, gridSizeX, gridSizeY);
	}
}
function drawSnake() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	//body draw
	context.fillStyle = "green";
	for (let  i = 0; i < lengthTail; i++) {
		context.fillRect(stackTraceTail[i].xPos * gridSizeX, stackTraceTail[i].yPos * gridSizeY,gridSizeX, gridSizeY);
	}
	//head draw
	context.fillStyle = "limegreen"; 
	context.fillRect(xSnak * gridSizeX, ySnak * gridSizeY, gridSizeX, gridSizeY);
}

function drawFood() {
	if (xFood == 0 && yFood == 0){
		xFood = randomGenerator(areaWidth - 2, 2);
		yFood = randomGenerator(areaHeight - 2, 2);
	}
	context.fillStyle = "red";
	context.fillRect(xFood * gridSizeX, yFood * gridSizeY, gridSizeX, gridSizeY);
}

function stackTailManagement(){
	//shift trace
	stackTraceTail.push({xPos : xSnak, yPos : ySnak});
	if (shiftStackTail == 1){
		stackTraceTail.shift();
	}
	shiftStackTail = 1;
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
	xSnak = 5;
	ySnak = 5;
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

