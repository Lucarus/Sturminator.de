
function Schnek(square) {

  this.square = square;
  this.loc = {x: 25, y: 25};
  this.foodLevel = 10;
  this.speed = {x: 0, y: 0};
  this.peaces = new Array;

  this.foodLoc = {x: 0, y: 0};

  // food finding stuff
  this.seekBresenham = {x: 0, y: 0, f: 0, sr: "x|y", nsr: "x|y"};
  this.seekBresenhamVorz = {x: 0, y: 0};
  this.seeking = false;

  // teile updaten
  this.update = function() {

    if (this.foodLoc.x == this.loc.x && this.foodLoc.y == this.loc.y) {
      //grow
      //this.foodLevel++;
      
      this.seeking = false;
      this.speed = {x: 0, y: 0};  
    }

    if (this.seeking)
      this.seekUpdate();

    this.loc.x += this.speed.x;
    this.loc.y += this.speed.y;

    // creates new head
    this.peaces.unshift(new SchnekPeace(this.loc));
    //deletes last element if chain is too long
    if (this.peaces.length > this.foodLevel) {
      this.peaces.pop();
    }
  }

  // kasten zeichnen
  this.draw = function() {
    for (var i = 0; i < this.peaces.length; i++) {
      fill('orange');
      if (i == 0) fill('red');

      rect(this.peaces[i].x * this.square.width, this.peaces[i].y * this.square.height, this.square.width, this.square.height);
    }
  }

  // ändert die richtung
  // abfrage, ob in sich selbst fährt !important
  this.changeDirektion = function(speedX, speedY) {
    if (this.seeking) return;

    if (this.speed.x != speedX * -1) {
      this.speed.x = speedX; 
    }

    if (this.speed.y != speedY * -1) {
      this.speed.y = speedY;
    }
  }

  // seek for the nice and tasty food amk
  this.seekForFood = function(foodLoc) {
    this.foodLoc = foodLoc;

    var f, sr, nsr;
    var x = foodLoc.x - this.loc.x;
    if (x < 0) {this.seekBresenhamVorz.x = -1} else {this.seekBresenhamVorz.x = 1}
    var y = foodLoc.y - this.loc.y;
    if (y < 0) {this.seekBresenhamVorz.y = -1} else {this.seekBresenhamVorz.y = 1}
    
    // nur positiv denken !
    x = Math.abs(x);
    y = Math.abs(y);

    if (x > y) {
      f = x * 0.5;
      sr = "x";
      nsr = "y";
    } else {
      nsr = "x";
      sr = "y";
      f = y * 0.5;
    }
 
    this.seekBresenham = {x: x, 
                          y: y, 
                          f: f, 
                         sr: sr, 
                        nsr: nsr
                      };

    // console.log(this.seekBresenham);

    this.seeking = true;
  }

  // stop the seeking for food
  this.stopSeeking = function() {
    this.seeking = false;
  }

  // private function
  this.seekUpdate = function() {
    //Überlegung...
    // aktuelle position mit der des essens vergleichen und dann zuerst horizontal, dann erst vertikal fahren
    // ist nicht das schnellste / ok sollte alles gleich schnell sein oder ? ach mein kopf mit musik kann nicht denken
    // deswegen erst mal so mal schauen was daraus wird :D
    this.speed = {x: 0, y: 0};

    this.speed[this.seekBresenham.sr] = this.seekBresenhamVorz[this.seekBresenham.sr];

    this.seekBresenham.f -= this.seekBresenham[this.seekBresenham.nsr];

    if (this.seekBresenham.f < 0) {
      this.speed[this.seekBresenham.nsr] = this.seekBresenhamVorz[this.seekBresenham.nsr];
      this.seekBresenham.f += this.seekBresenham[this.seekBresenham.sr];
    }

    //console.log(this.seekBresenham);
        
  }

  this.isHungry = function() {
    return !this.seeking;
  }

  this.getLocation = function() {
    return {x: this.loc.x, y: this.loc.y};
  }
}

function SchnekPeace(loc) {
  this.x = loc.x;
  this.y = loc.y;
}