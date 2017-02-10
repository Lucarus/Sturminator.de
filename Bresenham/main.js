
var viewPort = document.getElementsByTagName('body')[0];

console.log(viewPort);
console.log("LOG");

var square = {width: 10, height:10};
var field = {width: Math.floor(viewPort.clientWidth / square.width), height: Math.floor(viewPort.clientHeight / square.width)};

var schnek = new Schnek(square);
var schnekLoc = {x: 0, y: 0};
var foodController = new FoodController(field, square);

var foodLoc = {x: 0, y:0};

var statusText = "Nothing";
var fps = 10;

var onMove = false;
var closeUp = true;

function setup() {
  createCanvas(field.width * square.width, field.height * square.height);
  frameRate(fps);
}

function draw() {
  clear();

  // update the snake
  foodController.drawFood();
  schnek.update();
  // wenn die schlange was zu essen will, dann gibt man ihr besser was 
  if (schnek.isHungry()) {
    if (closeUp) { 
      initNewFoodClose();
    } 
    else {
      initNewFood();
    }   
  }

  schnek.draw();

  text("Snake Bresenham Example by Lukas St.", 10, 10);
}

function initNewFood(x, y) {

  // change text
  statusText = "Seeking for food....";

  // delete ALL present foods
  foodController.clearFood();

  // create new food
  if (x !== undefined && y !== undefined) {
    foodLoc = foodController.createFood(x, y);
  } else {
    foodLoc = foodController.createFood();
  }

  // let snake hunt the food
  schnek.seekForFood(foodLoc);
}

function initNewFoodClose() {
  foodController.clearFood();

  schnekLoc = schnek.getLocation();
  foodLoc = foodController.createFoodRange(schnekLoc.x - 10, schnekLoc.x + 10, schnekLoc.y - 10, schnekLoc.y + 10);
  schnek.seekForFood(foodLoc);
}

function stopSeeking() {
  schnek.stopSeeking();
}

function mouseClicked() {
  // mouseX, mouseY,

  var x = mouseX / square.width;
  var y = mouseY / square.height;

  x = Math.floor(x);
  y = Math.floor(y);
  
  initNewFood(x, y);

  return false;
}

function mouseMoved() {
  // mouseX, mouseY,
  if (!onMove) return;

  var x = mouseX / square.width;
  var y = mouseY / square.height;

  x = Math.floor(x);
  y = Math.floor(y);
  
  initNewFood(x, y);

  return false;
}

// key down EVENT 
function keyPressed() {

  if (keyCode == 32) {
    schnek = new Schnek(square);
  } else if (keyCode == 37) {
    schnek.changeDirektion(-1, 0);
  } else if (keyCode == 39) {
    schnek.changeDirektion(1, 0);
  } else if (keyCode == 38) {
    schnek.changeDirektion(0, -1);
  } else if (keyCode == 40) {
    schnek.changeDirektion(0, 1);
  } else if (keyCode == 187) {
    frameRate(60);
  } else if (keyCode == 189) {
    frameRate(30);
  }
}
