
let GAME_FPS = 60;
var controller = new Controller();

var displayPlay = false;
var displayStepp = false;


function setup() {

    createCanvas(1600, 800);
    frameRate(GAME_FPS);
    noStroke();

    controller.init();

    // Klick handler hinzufügen
    document.getElementById("startSort").onclick = function(e) {
        if (displayPlay) e.target.src = "img/play.png";
        if (!displayPlay) e.target.src = "img/stop_on.png";
        
        if (displayPlay) {
            controller.pause();
        } else {
            controller.swapSort(); 
            controller.bubbleSort(); 
            controller.selectionSort();  
        }

        displayPlay = !displayPlay;  
    };
    document.getElementById("startSort").onmouseover = function(e) {
        if (displayPlay) e.target.src = "img/play.png";
        if (!displayPlay) e.target.src = "img/stop_on.png";
    };
    document.getElementById("startSort").onmouseleave = function(e) {
        if (displayPlay) e.target.src = "img/stop_on.png";
        if (!displayPlay) e.target.src = "img/play.png";    
    };

    document.getElementById("steppMode").onclick = function(e) {
        if (!displayStepp) e.target.src = "img/steppmode_on.png";
        if (displayStepp) e.target.src = "img/steppmode.png"; 

        displayPlay = !controller.toggleSteppMode()

        // Das aus der Startsort Klick auch hier übernehmen
        if (displayPlay) document.getElementById("startSort").src = "img/play.png";
        if (!displayPlay) document.getElementById("startSort").src = "img/stop_on.png";
        
        if (displayPlay) {
            controller.pause();
        } else {
            controller.swapSort(); 
            controller.bubbleSort(); 
            controller.selectionSort();  
        }

        displayPlay = !displayPlay;  
        displayStepp = !displayStepp;
    };
    document.getElementById("steppMode").onmouseover = function(e) { 
        if (!displayStepp) e.target.src = "img/steppmode_on.png";
        if (displayStepp) e.target.src = "img/steppmode.png"; 
    }
    document.getElementById("steppMode").onmouseleave = function(e) {
        if (!displayStepp) e.target.src = "img/steppmode.png";
        if (displayStepp) e.target.src = "img/steppmode_on.png";
    }

    document.getElementById("forwardStepp").onclick = function(e) {
        controller.sortStepp(); 
    };
    document.getElementById("runShuffle").onclick = function(e) {
        document.getElementById("startSort").src = "img/play.png";
        document.getElementById("steppMode").src = "img/steppmode.png";

        displayPlay = false;
        displayStepp = false;
        controller.newLists(14); 
    };
}

function draw() {
    clear();
    // Update everything
    controller.update();
}

function mouseClicked() {
    // mouseX, mouseY,
    //controller.click(mouseX, mouseY);
    //return false;
    controller.idleMode = false;
}

function keyPressed() {
    if (keyCode == 13) {
        controller.idleMode = !controller.idleMode;
    }
    if (keyCode == 80) {
        
    }
    if (keyCode == 68) {
        controller.faster();
    }
    if (keyCode == 65) {
        controller.slower();
    }
    //console.log(keyCode);
}

function areColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((x1 + w1) >= x2 && x1 <= (x2 + w2) && (y1 + h1) >= y2 && y1 <= (y2 + h2)) return true;
    return false;
}

function copyArray(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copyArray(v) : v;
    }
    return output;
}
