class LifeContainer {
    constructor(max_cell_width, max_cell_height) {
        this.max_cell_width_amount = max_cell_width;
        this.max_cell_height_amount = max_cell_height;

        // Array initialisieren
        this.lifes = Array(max_cell_width);
        for (var i = 0; i < max_cell_width; i++) {
            this.lifes[i] = Array(max_cell_height);
            for (var j = 0; j < max_cell_height; j++) {
                this.lifes[i][j] = false;
            }
        }
    }
    // Neue Zelle erstellen
    push(x, y) {
        this.lifes[x][y] = true;
        rect(x * cell_width, y * cell_height, cell_width, cell_height)
    }
    tick() {
        
        // Neues Array instanziieren
        // Die Änderungen sollen nicht live geschehen, da das Auswirkungen auf die Regeln hat
        let newLifes = Array(this.max_cell_width_amount);
        for (var x = 0; x < this.lifes.length; x++) {
            // zweite Dimension    
            newLifes[x] = Array(this.max_cell_height_amount);
            for (var y = 0; y < this.lifes[0].length; y++) {

                // Alle Ecken der Zelle abfragen
                let amountCorners = 0;
                let corners = [
                    this.whois(x, y - 1),
                    this.whois(x + 1, y - 1),
                    this.whois(x + 1, y),
                    this.whois(x + 1, y + 1),
                    this.whois(x, y + 1),
                    this.whois(x - 1, y + 1),
                    this.whois(x - 1, y),
                    this.whois(x - 1, y - 1)
                ];

                // Menge der lebenden ermitteln
                for (let corner of corners) {
                    if (corner) {
                        amountCorners++;
                    }
                }

                // Regeln anwenden
                if (this.lifes[x][y] == false && amountCorners == 3) {
                    newLifes[x][y] = true;
                    // Wenn die Zelle lebt, wird die gezeichnet andernfalls nicht
                    rect(x * cell_width, y * cell_height, cell_width, cell_height)
                } else if (amountCorners == 1 || amountCorners == 0) {
                    newLifes[x][y] = false;
                } else if ((amountCorners == 2 || amountCorners == 3) && this.lifes[x][y]) {
                    newLifes[x][y] = true;
                    // Wenn die Zelle lebt, wird die gezeichnet andernfalls nicht                    
                    rect(x * cell_width, y * cell_height, cell_width, cell_height)
                } else {
                    newLifes[x][y] = false;
                }
            }
        }
       // Arrays tauschen
        this.lifes = newLifes;
    }
    // Sichere möglichkeit einen Wert im Array abzufragen
    whois(X, Y) {
        if (X < 0 || Y < 0 || X >= this.max_cell_width_amount || Y >= this.max_cell_height_amount) return null;
        return this.lifes[X][Y];
    }
}

const cell_height = 16, cell_width = 16;
const canvas_height = 800, canvas_width = 800;
const lifes = new LifeContainer(canvas_width / cell_width, canvas_height / cell_height); // max Zellen in beide richtungen

function setup() {  
    createCanvas(canvas_width, canvas_height);
    frameRate(5);
}
let update = false;

function draw() {
    if (update) {
        clear();
        lifes.tick();
    }
}

function mouseClicked() {   
    lifes.push(floor(mouseX / cell_width), floor(mouseY / cell_height));
}

function keyPressed() {
    if (keyCode == 32) {
        // Start Stopp
        update = !update;
    }
}
