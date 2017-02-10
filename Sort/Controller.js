
function Controller() {

    this.sortElements = [];
    this.liftedItemIndex = -1;

    this.normForm = {W: 400, H: 30, R: 10};

    this.animator = new Animator(this.sortElements);

    this.bubbleSort = function() {  
        this.isBubblesorting = true;
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

    this.isBubblesorting = false;
    this.bubbleSort_i = 1;
    this.bubbleSort_x = 0;
    this.SORT_TIME =  50;
    this.nextSteppIn = 0;

    // Alle Sortieritems updaten lassen
    this.update = function() {

        // anderes Zeig Animationen etc...
        if (this.isBubblesorting) {
            if (this.nextSteppIn <= 0) {
                if (this.bubbleSort_x < this.sortElements.length) {
                    if (this.bubbleSort_i < this.sortElements.length - this.bubbleSort_x) {
                        if ( this.sortElements[this.bubbleSort_i-1].value > this.sortElements[this.bubbleSort_i].value) {
                            temp = this.sortElements[this.bubbleSort_i];
                            this.sortElements[this.bubbleSort_i] = this.sortElements[this.bubbleSort_i-1];
                            this.sortElements[this.bubbleSort_i-1] = temp;
                            this.animator.displace(this.bubbleSort_i - 1, {X: this.sortElements[this.bubbleSort_i].location.X, Y: this.sortElements[this.bubbleSort_i].location.Y});
                            this.animator.displace(this.bubbleSort_i, {X: this.sortElements[this.bubbleSort_i-1].location.X, Y: this.sortElements[this.bubbleSort_i-1].location.Y});    

                            this.nextSteppIn = this.SORT_TIME;
                        } else {
                            this.bubbleSort_i++;
                        }
                    } else if (this.bubbleSort_i >= this.sortElements.length) {
                        this.bubbleSort_i = 1;
                        this.bubbleSort_x++;
                    }
                } else {
                    this.isBubblesorting = false;
                    this.bubbleSort_i = 1;
                    this.bubbleSort_x = 0;
                    this.SORT_TIME =  40;
                    this.nextSteppIn = 0;
                }
            } else {
                this.nextSteppIn--;
            }
        }
        
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