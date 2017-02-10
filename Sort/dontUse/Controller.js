
function Controller() {

    this.sortElements = [];
    this.liftedItemIndex = -1;

    this.normForm = {W: 400, H: 30, R: 10};

    this.animator = new Animator(this.sortElements);
    //this.controllManager = new ControllManager();

    this.init = function() {
        //this.controllManager.addControll(new Button({X: 100, Y: 20}, {W: 100, H: 20}, "Sort", this.bubbleSort));
    }

    this.bubbleSort = function() {  
        console.log(this.sortElements);
        for (var x = 0; x < this.sortElements.length; x++) {
            for (var i = 1; i < this.sortElements.length - x; i++) {
                if (this.sortElements[i-1].value > this.sortElements[i].value) {
                    temp = this.sortElements[i];
                    this.sortElements[i] = this.sortElements[i-1];
                    this.sortElements[i-1] = temp;
                    setTimeout(function() {
                        this.animator.displace(i - 1, {X: this.sortElements[i].location.X, Y: this.sortElements[i].location.Y});
                        this.animator.displace(i, {X: this.sortElements[i-1].location.X, Y: this.sortElements[i-1].location.Y});    
                    }, i * 1000);    
                }
            }
        }
        //this.placeInOrder(this.sortElements);
    }

    // Sortieritem auswählen
    // DEBUG: Neues Sortieritem erstellen
    this.click = function(mouseX, mouseY) {

        // Jedes Element durchlaufen
        for (var i = 0; i < this.sortElements.length; i++) {
            // Kollision abfragen
            if (areColliding(mouseX, mouseY, 1, 1, this.sortElements[i].location.X, this.sortElements[i].location.Y, this.sortElements[i].form.W, this.sortElements[i].form.H)) {
                // Hoverstatus für das geklickte element toggeln
                if (this.sortElements[i].toggleUp()) {
                    this.liftedItemIndex = i;
                } else {
                    this.liftedItemIndex = -1;
                }
                // Wenn ein Element getoggelt wurde schließen
                return;
            }
        }
        // Wenn kein Element geklickt wurde ein neues erstellen
        this.sortElements.push(new Sortitem(mouseX - this.normForm.W * 0.5, mouseY - this.normForm.H * 0.5, this.normForm.W, this.normForm.H, this.normForm.R, random(1, 100)));
    }

    this.mouseMove = function(mouseX, mouseY) {

        // Wenn ein element geklickt wurde mit dem Mauszeiger verschieben
        if (this.liftedItemIndex != -1) {
            this.sortElements[this.liftedItemIndex].location = {X: mouseX - this.sortElements[this.liftedItemIndex].form.W * 0.5, Y: mouseY - this.sortElements[this.liftedItemIndex].form.H * 0.5};
        }
    }

    // Alle Sortieritems updaten lassen
    this.update = function() {

        // anderes Zeig Animationen etc...

        // Animationen updaten
        this.animator.update();

        // alle Elemente zeichnen
        this.sortElements.forEach(function(sortitem) {
            sortitem.draw();
        });
    }

    this.debug = function() {
        this.placeInOrder(this.sortElements);
    }

    this.placeInOrder = function(sortedList) {
        var compHeight = 10;
        for (var i = 0; i < sortedList.length; i++) {
            this.animator.displace(i, {
                X: 10,
                Y: (compHeight += sortedList[i].form.H + 10)
            });
        }
    }
}