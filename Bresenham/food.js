
function FoodController(field, square) {

  this.food = new Array;

  this.square = square;
  this.field = field;

  this.createFood = function(x, y) {
    if (x === undefined) x = Math.floor(random(0, this.field.width / this.square.width));
    if (y === undefined) y = Math.floor(random(0, this.field.height / this.square.height));
    
    this.food.push(new Food(x, y));
    
    // kann man bestimmt mal brauchen
    return({x: x, y: y});  
  }

  this.createFoodRange = function(x1, x2, y1, y2) {
    // nicht über Bildschirm rand gehen 
    if (x1 < 0) x1 = 0;
    if (y1 < 0) y1 = 0;
    if (x2 > this.field.width / this.square.width) x2 = this.field.width / this.square.width;
    if (y2 > this.field.height / this.square.height) y2 = this.field.height / this.square.height;
    
    var x = Math.floor(random(x1, x2));
    var y = Math.floor(random(y1, y2));

    this.food.push(new Food(x, y));

    // kann man bestimmt mal brauchen
    return({x: x, y: y});  
  }

  this.clearFood = function() {
    this.food = new Array;
  }

  this.drawFood = function() {
    fill('green');
    for (var i = 0; i < this.food.length; i++) {
      rect(this.food[i].x * this.square.width, this.food[i].y * this.square.height, this.square.width, this.square.height);
    }
  }
}

function Food(x, y) {

  this.x = x;
  this.y = y;

}