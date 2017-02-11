
function Controller() {
    this.normForm = {W: 400, H: 30, R: 10};

    this.sortElements = [];
    this.sortHighlight = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H * 2 + 20, 0, "", "rgba(0,255,0, 0.75)");
    this.liftedItemIndex = -1;

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

    //Variablen für Sortanimation
    this.isBubblesorting = false;
    this.bubbleSort_i = 1;
    this.bubbleSort_x = 0;
    this.SORT_TIME =  50;
    this.NOSORT_TIME = 10;
    this.nextSteppIn = 0;

    // Alle Sortieritems updaten lassen
    this.update = function() {

        // Bubblesort Sortanimation
        /*
            Um mit den Animationen leichter arbeiten zu können wird die Sortfunktion in die Updateschleife ausgelagert.
            Das heißt es wird ~ jede Sekunde ein schritt in dem Algorithmus durchlaufen.
        */
        if (this.isBubblesorting) {
            // Mainschleife nur ausführen, wenn wir gerade NICHT in einer Animationsphase sind
            if (this.nextSteppIn <= 0) {
                //Äußere Schleife des Bubblesorts
                if (this.bubbleSort_x < this.sortElements.length) {
                    //Innere Schleife des Bubblesorts
                    if (this.bubbleSort_i < this.sortElements.length - this.bubbleSort_x) {
                        // Highlight an richtige stelle Setzen
                        this.sortHighlight.location = {
                            X: this.sortElements[this.bubbleSort_i - 1].location.X - 5,
                            Y: this.sortElements[this.bubbleSort_i - 1].location.Y - 5
                        };
                        // kurze Zeit warten auch wenn kein Element gefunde wurde
                        this.nextSteppIn = this.NOSORT_TIME;

                        //Klassisches tauschen, wenn die verglichenen Elemente .... sind.
                        if ( this.sortElements[this.bubbleSort_i-1].value > this.sortElements[this.bubbleSort_i].value) {
                            temp = this.sortElements[this.bubbleSort_i];
                            this.sortElements[this.bubbleSort_i] = this.sortElements[this.bubbleSort_i-1];
                            this.sortElements[this.bubbleSort_i-1] = temp;
                            // Animationsmanager mit der Bewegungsanimation beauftragen
                            this.animator.displace(this.bubbleSort_i - 1, {X: this.sortElements[this.bubbleSort_i].location.X, Y: this.sortElements[this.bubbleSort_i].location.Y});
                            this.animator.displace(this.bubbleSort_i, {X: this.sortElements[this.bubbleSort_i-1].location.X, Y: this.sortElements[this.bubbleSort_i-1].location.Y});    
                            // Die nächsten n Updatedurchläufe den Algorithmus nicht starten
                            this.nextSteppIn = this.SORT_TIME;
                        } else {
                            this.bubbleSort_i++;
                        }
                    } else if (this.bubbleSort_i >= this.sortElements.length - this.bubbleSort_x) {
                        // Innere Schleife resetten
                        this.bubbleSort_i = 1;
                        // Außere Schleife weiterzählen
                        this.bubbleSort_x++;
                    }
                } else {
                    // Äußere Schleife ist fertig
                    // Alle Variablen resetten und für nächsten Sort bereit machen
                    this.isBubblesorting = false;
                    this.bubbleSort_i = 1;
                    this.bubbleSort_x = 0;
                    this.nextSteppIn = 0;

                    this.sortHighlight.location = {X: -1000, Y: -1000};
                }
            } else {
                this.nextSteppIn--;
            }
        }
        
        // Animationen updaten
        this.animator.update();

        // ! Achtung !
        // Die Reihenfolge ist hier entscheident

        // Sortelement Highlight zeichenen
        this.sortHighlight.draw();

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