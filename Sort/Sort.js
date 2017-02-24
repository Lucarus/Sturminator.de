
let GAME_FPS = 60;
var controller = new Controller();

function setup() {
    createCanvas(1500, 800);
    frameRate(GAME_FPS);
    noStroke();
<<<<<<< HEAD

    controller.init();

    // Klick handler hinzufügen
    document.getElementById("startSort").onclick = function() { controller.bubbleSort(); controller.selectionSort(); controller.insertionSort(); };
    document.getElementById("steppMode").onclick = function() { controller.toggleSteppMode(); };
    document.getElementById("forwardStepp").onclick = function() { controller.sortStepp(); };
    document.getElementById("runSort").onclick = function() { controller.runThrough(); };
    document.getElementById("runShuffle").onclick = function() { controller.shuffle(); };
=======
>>>>>>> Produktiv
}

function draw() {
    clear();
    // Update everything
    controller.update();
}

function mouseClicked() {
    // mouseX, mouseY,
    controller.click(mouseX, mouseY);
    return false;
}

function keyPressed() {
    if (keyCode == 13) {
        controller.debug();
    }
    if (keyCode == 80) {
        controller.bubbleSort();
        controller.selectionSort();
    }
    if (keyCode == 68) {
        controller.sortStepp();
    }
<<<<<<< HEAD
    if (keyCode == 65) {
        controller.staaahp();
    }
=======
>>>>>>> Produktiv
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