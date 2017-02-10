var maxConnections = 1;
var minConnections = 1;

var speed = 3;
var decRadius = 100;
var connectRadius = 40;
var spanwBalls = 1;

var showHitbox = true;

// dont change!!
var c = document.getElementById("canv");
var rect = c.getBoundingClientRect();
var ctx = c.getContext("2d");

// nur zur übersicht
var balls = [{x: 0 , y: 0 , cons: [] , movX: -1 , movY: 1 , drawLine:false, color:getRandomColor(), radius:0, selected:false}];
balls.splice(0);

var mouseX = 0;
var mouseY = 0;

var conColors = [];

c.addEventListener('click', on_canvas_click, false);
c.addEventListener('mousemove', on_mouse_move, false);
c.addEventListener('contextmenu', on_canvas_rightclick, false);

init();

function on_canvas_rightclick(evt) {
    console.log("right");
    return false;
}

function setSettings() {
    form = document.getElementById("settingsForm");
    maxConnections = form.elements["maxCon"].value;
    minConnections = form.elements["minCon"].value;
    speed = form.elements["speed"].value;
    spanwBalls = form.elements["balls"].value;
    decRadius = form.elements["decRadius"].value;
    connectRadius = form.elements["connectRadius"].value;

     for (var i = conColors.length-1; i < minConnections; i++) {
         conColors.push(getRandomColor());
     }

}

function init() {

    for (var i = 0; i < maxConnections; i++) {
        conColors.push(getRandomColor());
        //conColors.push('white');    
    }
    console.log(conColors);
}

function loop() {

    ctx.clearRect(0, 0, c.width, c.height);

    checkMouse();

    //drawBalls();
    //drawBallLine(connectRadius);
    //drawBallsWithRadius(connectRadius);
    drawBallsWithRadiusAndRadius(connectRadius);
    
    moveBalls();
}

function checkMouse() {

    ctx.beginPath();
    ctx.globalAlpha=0.2;
    ctx.fillStyle = 'lightgray';

    for (var i = 0; i < balls.length; i++) {
        if (decRadius < Math.sqrt(Math.pow(balls[i].x - mouseX, 2) + Math.pow(balls[i].y - mouseY, 2))) {balls[i].drawLine = false; continue; }
    
        balls[i].drawLine = true;

        ctx.fillStyle = 'green';
    }

    if (showHitbox)
        ctx.arc(mouseX,mouseY, decRadius, 0, 2*Math.PI);

    ctx.fill();
    ctx.globalAlpha=1;
}


function moveBalls() {
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x > c.width) {
            balls[i].movX = (Math.random()-1.1);          
        } else if(balls[i].x < 0) {
            balls[i].movX = Math.random();     
        }else if(balls[i].y > c.height) {
            balls[i].movY = (Math.random()-1.1);
        } else if ( balls[i].y < 0) {
            balls[i].movY = Math.random();
        }
        //1.1, damit keine 0 entsteht und auch nicht zu lagsam wird        
        balls[i].x += balls[i].movX * speed;
        balls[i].y += balls[i].movY * speed;
    }
}

function drawBallsWithRadiusAndRadius(ballDecRadius) {
    //draws the Line

    var maxCons = 5;
    var curCons = 0;

    for (var i = 0; i < balls.length; i++) {
        if (!balls[i].drawLine) continue;
        balls[i].slected = true;

        for (var z = 0; z < balls.length; z++) {

            if (curCons >= maxCons) break;
            if (ballDecRadius < Math.sqrt(Math.pow((balls[i].x - balls[z].x), 2) + Math.pow((balls[i].y - balls[z].y), 2))) continue;

            ctx.beginPath();
            ctx.moveTo(balls[z].x, balls[z].y);
            ctx.lineTo(balls[i].x, balls[i].y);
            balls[z].selected = true;
            ctx.strokeStyle = conColors[z];
            ctx.stroke();

            curCons++;

        }

        curCons = 0;
    }


    //Punkte nach linien Zeichnen
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2*Math.PI);
        ctx.fillStyle = balls[i].color;
        if (balls[i].selected) {
            ctx.fillStyle = '#f34426';
            balls[i].selected = false;
        }
        ctx.strokeWidth = 0;
        ctx.fill();
    }
}

function drawBallsWithRadius(ballDecRadius) {
    //draws the Line
    for (var i = 0; i < balls.length; i++) {
        if (!balls[i].drawLine) continue;
        balls[i].slected = true;

        for (var z = 0; z < balls[i].cons.length; z++) {
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[balls[i].cons[z]].x, balls[balls[i].cons[z]].y);
            balls[balls[i].cons[z]].selected = true;
            ctx.strokeStyle = conColors[z];
            ctx.stroke();

            for (var y = 0; y < balls.length; y++) {
                if (balls[y].x < balls[balls[i].cons[z]].x + ballDecRadius && balls[y].x > balls[balls[i].cons[z]].x - ballDecRadius) {
                    if (balls[y].y < balls[balls[i].cons[z]].y + ballDecRadius && balls[y].y > balls[balls[i].cons[z]].y - ballDecRadius) {
                        ctx.beginPath();
                        ctx.moveTo(balls[balls[i].cons[z]].x, balls[balls[i].cons[z]].y);
                        ctx.lineTo(balls[y].x, balls[y].y);
                        balls[y].selected = true;
                        ctx.strokeStyle = conColors[z];
                        ctx.stroke();
                    }
                }
            }
        }
    }

    //Punkte nach linien Zeichnen
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2*Math.PI);
        ctx.fillStyle = balls[i].color;
        if (balls[i].selected) {
            ctx.fillStyle = '#f34426';
            balls[i].selected = false;
        }
        ctx.strokeWidth = 0;
        ctx.fill();
    }
}

function drawBallLine(length) {

    //draws the Line
    for (var i = 0; i < balls.length; i++) {
        if (!balls[i].drawLine) continue;

        var x = i;

        for (var y = 0; y < length; y++) {

            var randomPartner = balls[x].cons[0];

            ctx.beginPath();
            ctx.moveTo(balls[x].x, balls[x].y);
            ctx.lineTo(balls[randomPartner].x, balls[randomPartner].y);
            ctx.strokeStyle = conColors[x];
            ctx.stroke();
            ctx.fill();

            x = randomPartner;
        }
        break;
    }


    //Punkte nach linien Zeichnen
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2*Math.PI);
        ctx.fillStyle = balls[i].color;
        ctx.strokeWidth = 0;
        ctx.fill();
    }
}

function drawBalls() {

    //draws the Line
    for (var i = 0; i < balls.length; i++) {
        if (!balls[i].drawLine) continue;

        for (var z = 0; z < balls[i].cons.length; z++) {
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[balls[i].cons[z]].x, balls[balls[i].cons[z]].y);
            ctx.strokeStyle = conColors[z];
            ctx.stroke();
        }
    }

    //Punkte nach linien Zeichnen
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2*Math.PI);
        ctx.fillStyle = balls[i].color;
        ctx.strokeWidth = 0;
        ctx.fill();

    }
}

function createNewBall(ev) {

    balls.push({x:ev.clientX - rect.left ,
        y:ev.clientY - rect.top , 
        cons:[] , 
        movX:(Math.random()-0.5) , 
        movY:(Math.random()-0.5) , 
        drawLine:false ,
        color:getRandomColor() , 
        radius: random(5, 2) ,
        selected: false
    });

    for (var i = 0; i < random(maxConnections, minConnections); i++) {
        balls[balls.length-1].cons.push(random(balls.length - 1));
    }
}

function on_canvas_click(ev) {

    for (var z = 0; z < spanwBalls; z++) {
        createNewBall(ev);
    }
}

function resetCan() {
    balls = [];    
}

function getRandomColor() {
    var hex = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return 'white';
}

function random(max, min) {
    if (typeof min === 'undefined') { min = 0; }
    if (typeof max === 'undefined') { max = 1; }

    var rnd = Math.floor(Math.random() * (max - min)) + min; 

    console.log(min + " - " + max + " = " + rnd);

    return rnd; 
}

function on_mouse_move(ev) {

    mouseX = ev.clientX - rect.left;
    mouseY = ev.clientY - rect.top;

}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 80);
          };
})();

(function animate(){
  requestAnimFrame(animate);
  loop();
})();