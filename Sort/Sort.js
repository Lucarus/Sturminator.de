
var controller = new Controller();

function setup() {
    createCanvas(1500, 800);
    frameRate(30);
    noStroke();

    controller.init();
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

function mouseMoved() {
    // mouseX, mouseY,
    controller.mouseMove(mouseX, mouseY);
    return false;
}

function keyPressed() {
    if (keyCode == 13) {
        controller.debug();
    }
    if (keyCode == 80) {
        controller.bubbleSort();
    }
    console.log(keyCode);
}

function areColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((x1 + w1) >= x2 && x1 <= (x2 + w2) && (y1 + h1) >= y2 && y1 <= (y2 + h2)) return true;
    return false;
}

