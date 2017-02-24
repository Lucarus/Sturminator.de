
function Controller() {
    // Standardform für sortierelemente
    this.normForm = {W: 400, H: 30, R: 10};

    // Listen für die Elemente die sortiert werden
    this.bubblesortElements = [];
    this.selectionsortElements = [];
    this.insertionsortElements = [];
    this.noClickList = [];

    // Sorthighlight der den Hintergrund für die Elemente die sortiert werden darstellt
    this.bubblesort_Highlight = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H * 2 + 20, 10, "", "rgba(0,255,0, 0.75)");
    this.selectionsort_HighlightX = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,0,255, 0.75)");
    this.selectionsort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,255,0, 0.75)");
    this.selectionsort_HighlightS = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(255,0,0, 0.75)");
    this.liftedItemIndex = -1;

    // Sorts starten
    this.bubbleSort = function() { this.isBubblesorting = true; }
    this.insertionSort = function() { this.isInsertionsorting = true; }
    this.selectionSort = function() { this.isSelectionsorting = true; }
    this.staaahp = function() { this.isSelectionsorting = this.isInsertionsorting = this.isBubblesorting = false; }

    this.init = function() {
        // beser mit den ids der buttons verknüpfen
        this.noClickList.push(new NoclickRegion({ X: 0, Y: 0 },  { W: 100, H: 25 }));
        this.noClickList.push(new NoclickRegion({ X: 100, Y: 0 },  { W: 100, H: 25 }));
        this.noClickList.push(new NoclickRegion({ X: 200, Y: 0 },  { W: 100, H: 25 }));
        this.noClickList.push(new NoclickRegion({ X: 300, Y: 0 },  { W: 100, H: 25 }));
        this.noClickList.push(new NoclickRegion({ X: 400, Y: 0 },  { W: 100, H: 25 }));
        console.log(this.noClickList);
    }

    // Sortieritem auswählen
    // DEBUG: Neues Sortieritem erstellen
    this.click = function(mouseX, mouseY) {
        // Überprüfen ob Button geklickt werden
        for (var i = 0; i < this.noClickList.length; i++) {
            if (this.noClickList[i].gotClicked(mouseX, mouseY)) {
                return;
            }
        }

        // Jedes Element durchlaufen
        for (var i = 0; i < this.bubblesortElements.length; i++) {
            // Kollision abfragen
            if (areColliding(mouseX, mouseY, 1, 1, this.bubblesortElements[i].location.X, this.bubblesortElements[i].location.Y, this.bubblesortElements[i].form.W, this.bubblesortElements[i].form.H))
                return;
        }
        // Wenn kein Element geklickt wurde ein neues erstellen
        var value = random(1, 20);
        this.bubblesortElements.push(new Sortitem(mouseX - 10 * 15, mouseY - this.normForm.H * 0.5, "value", this.normForm.H, this.normForm.R, value));
        this.insertionsortElements.push(new Sortitem(mouseX - 10 * 15, mouseY - this.normForm.H * 0.5, "value", this.normForm.H, this.normForm.R, value));
        this.selectionsortElements.push(new Sortitem(mouseX - 10 * 15, mouseY - this.normForm.H * 0.5, "value", this.normForm.H, this.normForm.R, value));
    }

    this.sortStepp = function() { this.doNextStepp = true; };
    this.runThrough = function() { this.isSteppMode=false; };
    this.toggleSteppMode = function() { return(this.isSteppMode = !this.isSteppMode) };

    //Variablen für Sortanimation
    this.isSteppMode = false;
    this.doNextStepp = false;
    this.SWITCH_TIME =  0.3; // in Sekunden
    this.SORT_DELAY = 0.15; // in Sekunden 
    //this.NOSORT_TIME = 0.25; // in Sekunden
    //Bubblesort
    this.isBubblesorting = false;
    this.bubbleSort_i = 1;  // 1 ist wichtig
    this.bubbleSort_x = 0;
    this.bubbleSort_nextSteppIn = 0;
    //Inserstionsort
    this.isInsertionsorting = false;
    this.insertionSort_i = 0;
    this.insertionSort_x = 0;
    this.insertionSort_nextSteppIn = 0;
    //Selectionsort
    this.isSelectionsorting = false;
    this.selectionSort_i = 0;
    this.selectionSort_x = 0;
    this.selectionSort_nextSteppIn = 0;
    this.selectionSort_smallestIndex = 0;
    this.selectionSort_smalest = 999999;


    // Alle Sortieritems updaten lassen
    this.update = function() {

        // Wenn nicht im Steppmode, dann ist jeder Frame ein Stepp
        if (!this.isSteppMode) this.doNextStepp = true;

        // Bubblesort Sortanimation
        /*
            Um mit den Animationen leichter arbeiten zu können wird die Sortfunktion in die Updateschleife ausgelagert.
            Das heißt es wird ~ jede Sekunde ein schritt in dem Algorithmus durchlaufen.
        */
        if (this.isBubblesorting) {
            // für den Stepp mode
            if (this.isSteppMode && this.doNextStepp) this.bubbleSort_nextSteppIn = 0;
            // nur Ausführen wenn im Stepp
            if (this.doNextStepp) {
            // Mainschleife nur ausführen, wenn wir gerade NICHT in einer Animationsphase sind
                if (this.bubbleSort_nextSteppIn <= 0) {
                    //Äußere Schleife des Bubblesorts
                    if (this.bubbleSort_x < this.bubblesortElements.length) {
                        //Innere Schleife des Bubblesorts
                        if (this.bubbleSort_i < this.bubblesortElements.length - this.bubbleSort_x) {
                            // Highlight an richtige stelle Setzen
                            this.bubblesort_Highlight.location = {
                                X: this.bubblesortElements[this.bubbleSort_i - 1].location.X - 5,
                                Y: this.bubblesortElements[this.bubbleSort_i - 1].location.Y - 5
                            };
                            // kurze Zeit warten auch wenn kein Element gefunde wurde
                            this.bubbleSort_nextSteppIn = Math.round(GAME_FPS * this.SORT_DELAY);

                            //Klassisches tauschen, wenn die verglichenen Elemente .... sind.
                            if ( this.bubblesortElements[this.bubbleSort_i-1].value > this.bubblesortElements[this.bubbleSort_i].value) {
                                temp = this.bubblesortElements[this.bubbleSort_i];
                                this.bubblesortElements[this.bubbleSort_i] = this.bubblesortElements[this.bubbleSort_i-1];
                                this.bubblesortElements[this.bubbleSort_i-1] = temp;
                                // Animationsmanager mit der Bewegungsanimation beauftragen
                                this.displace(this.bubblesortElements[this.bubbleSort_i - 1], {X: this.bubblesortElements[this.bubbleSort_i].location.X, Y: this.bubblesortElements[this.bubbleSort_i].location.Y}, this.SWITCH_TIME);
                                this.displace(this.bubblesortElements[this.bubbleSort_i]    , {X: this.bubblesortElements[this.bubbleSort_i-1].location.X, Y: this.bubblesortElements[this.bubbleSort_i-1].location.Y}, this.SWITCH_TIME);    
                                // Die nächsten n Updatedurchläufe den Algorithmus nicht starten
                                this.bubbleSort_nextSteppIn = Math.round(GAME_FPS * this.SWITCH_TIME);
                            } else {
                                this.bubbleSort_i++;
                            }
                        } else if (this.bubbleSort_i >= this.bubblesortElements.length - this.bubbleSort_x) {
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
                        this.bubbleSort_nextSteppIn = 0;

                        this.bubblesort_Highlight.location = {X: -1000, Y: -1000};
                    }
                } else {
                    this.bubbleSort_nextSteppIn--;
                }
            }
        }

        // Selectionsort Sortanimation
        /*
            Um mit den Animationen leichter arbeiten zu können wird die Sortfunktion in die Updateschleife ausgelagert.
            Das heißt es wird ~ jede Sekunde ein schritt in dem Algorithmus durchlaufen.
        */
        if (this.isSelectionsorting) {
            // für den Stepp mode
            if (this.isSteppMode && this.doNextStepp) this.selectionSort_nextSteppIn = 0;
            // nur Ausführen wenn im Stepp
            if (this.doNextStepp) {
            // Mainschleife nur ausführen, wenn wir gerade NICHT in einer Animationsphase sind
                if (this.selectionSort_nextSteppIn <= 0) {
                    // Äußere schleife
                    if (this.selectionSort_x < this.selectionsortElements.length) {
                        // Highlight für äußere schleife
                        this.selectionsort_HighlightX.location = {X:this.selectionsortElements[this.selectionSort_x].location.X - 5 , Y: this.selectionsortElements[this.selectionSort_x].location.Y - 5 };
                        // innere schleife
                        if (this.selectionSort_i < this.selectionsortElements.length) {
                            // Highligt für Compare objekt
                            this.selectionsort_HighlightI.location = {X:this.selectionsortElements[this.selectionSort_i].location.X - 5 , Y: this.selectionsortElements[this.selectionSort_i].location.Y - 5 };
                            // kurze Zeit warten auch wenn kein Element gefunde wurde
                            this.selectionSort_nextSteppIn = Math.round(GAME_FPS * this.SORT_DELAY);

                            // kleinste Zahl finden
                            if (this.selectionsortElements[this.selectionSort_i].value < this.selectionSort_smalest) {
                                this.selectionsort_HighlightS.location = {X:this.selectionsortElements[this.selectionSort_i].location.X - 5 , Y: this.selectionsortElements[this.selectionSort_i].location.Y - 5 };
                                this.selectionSort_smalest = this.selectionsortElements[this.selectionSort_i].value;
                                this.selectionSort_smallestIndex = this.selectionSort_i;
                            } 
                            
                            this.selectionSort_i++;
                            
                        } else {
                            // Elemente tauschen, nachdem die inntereschleife einmal durchlaufen wurde
                            temp = this.selectionsortElements[this.selectionSort_smallestIndex];
                            this.selectionsortElements[this.selectionSort_smallestIndex] = this.selectionsortElements[this.selectionSort_x];
                            this.selectionsortElements[this.selectionSort_x] = temp;
                            // Animationsmanager mit der Bewegungsanimation beauftragen
                            this.displace(this.selectionsortElements[this.selectionSort_smallestIndex], {X: this.selectionsortElements[this.selectionSort_x].location.X, Y: this.selectionsortElements[this.selectionSort_x].location.Y}, this.SWITCH_TIME);
                            this.displace(this.selectionsortElements[this.selectionSort_x], {X: this.selectionsortElements[this.selectionSort_smallestIndex].location.X, Y: this.selectionsortElements[this.selectionSort_smallestIndex].location.Y}, this.SWITCH_TIME);    
                            // Die nächsten n Updatedurchläufe den Algorithmus nicht starten
                            this.selectionSort_nextSteppIn = Math.round(GAME_FPS * this.SWITCH_TIME);

                            // Außere Schleife weiterzählen
                            this.selectionSort_x++;
                            // Innere Schleife resetten
                            this.selectionSort_i = this.selectionSort_x;
                            this.selectionSort_smalest = 99999;
                        }
                    } else {
                        // clear everything
                        this.selectionSort_i = 0;
                        this.selectionSort_x = 0;
                        this.selectionSort_nextSteppIn = 0;
                        this.selectionSort_smalest = 99999;
                        this.isSelectionsorting = false;

                        this.selectionsort_HighlightI.location = {X: -1000, Y: -1000};
                        this.selectionsort_HighlightX.location = {X: -1000, Y: -1000};
                        this.selectionsort_HighlightS.location = {X: -1000, Y: -1000};
                    }
                } else {
                    this.selectionSort_nextSteppIn--;
                }
            }
        }
        
        // Inserstionsort Sortanimation
        /*
            Um mit den Animationen leichter arbeiten zu können wird die Sortfunktion in die Updateschleife ausgelagert.
            Das heißt es wird ~ jede Sekunde ein schritt in dem Algorithmus durchlaufen.
        */
        if (this.isInsertionsorting) {
            // für den Stepp mode
            if (this.isSteppMode && this.doNextStepp) this.insertionSort_nextSteppIn = 0;
            // nur Ausführen wenn im Stepp
            if (this.doNextStepp) {
            // Mainschleife nur ausführen, wenn wir gerade NICHT in einer Animationsphase sind
                if (this.insertionSort_nextSteppIn <= 0) {
                    // SORTING
                } else {
                    this.insertionSort_nextSteppIn--;
                }
            }
        }

        // next stepp nach jedem stepp zurücksetzen
        this.doNextStepp = false;

        // Animationen updaten
        this.animationUpdate();
        
        // ! Achtung !
        // Die Reihenfolge ist hier entscheident
        // Sortelement Highlight zeichenen
        this.bubblesort_Highlight.draw();
        this.selectionsort_HighlightS.draw();
        this.selectionsort_HighlightI.draw();
        this.selectionsort_HighlightX.draw();
        
        // alle Elemente zeichnen
        this.bubblesortElements.forEach(function(sortitem) {
            sortitem.draw();
        });
        this.selectionsortElements.forEach(function(sortitem){
            sortitem.draw();
        });
        this.insertionsortElements.forEach(function(sortitem) {
            //sortitem.draw();
        });
    }

    this.debug = function() {
        this.placeInOrder(this.bubblesortElements, 10);
        this.placeInOrder(this.selectionsortElements, 510);
        //this.placeInOrder(this.insertionsortElements, 1010);
    }

    this.placeInOrder = function(sortedList, X) {
        var compHeight = 10;
        for (var i = 0; i < sortedList.length; i++) {
            this.displace(sortedList[i], {
                X: X,
                Y: (compHeight += sortedList[i].form.H + 10)
            });
        }
    }

    this.movingElements = [];
    this.animationsToStop = [];

    this.displace = function(element, destination, dauerSekunden) {
        if (element.location.X == destination.X && element.location.Y == destination.Y) return;

        var presentIndex;
        var stepps = Math.round(dauerSekunden * GAME_FPS);
        if (!dauerSekunden) stepps = 40;
        var elementHypo = hypothenuse(destination.X - element.location.X, destination.Y - element.location.Y);

        // überprüfen, ob bereits elemente vohanden sind
        if(( presentIndex = this.movingElements.findIndex(x => x.E == element)) == -1) {
            // noch kein Element vorhanden
            this.movingElements.push({
                E: element,
                Vx: ((destination.X - element.location.X) / stepps),
                Vy: ((destination.Y - element.location.Y) / stepps),
                D: destination,
                Hv: elementHypo / stepps,
                H: elementHypo
            });
        } else {
            // Element vorhanden, also updaten
            this.movingElements[presentIndex] = {
                E: element,
                Vx: ((destination.X - element.location.X) / stepps),
                Vy: ((destination.Y - element.location.Y) / stepps),
                D: destination,
                Hv: elementHypo / stepps,
                H: elementHypo
            }
        }
    }

    this.animationUpdate = function() {        
        for (var i = 0; i < this.movingElements.length; i++) {
            this.movingElements[i].E.location.X += this.movingElements[i].Vx;
            this.movingElements[i].E.location.Y += this.movingElements[i].Vy;
            this.movingElements[i].H -= this.movingElements[i].Hv;

            if ((this.movingElements[i].H) <= 0) {
                this.movingElements[i].E.location.X = this.movingElements[i].D.X;
                this.movingElements[i].E.location.Y = this.movingElements[i].D.Y;
                this.animationsToStop.push(i);
            }
        }
        
        for (var i = 0; i < this.animationsToStop.length; i++) {
            this.movingElements.splice(this.animationsToStop[i] - i, 1); // um die indexverschiebung nach dem entfernen eines elements zu kompremieren um die menge an gelöschten elementen verschieben
        }
        this.animationsToStop = [];    
    }

    function doSelectionsort() {

    }

    function hypothenuse(a, b) {
        return Math.sqrt(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2))
    }
}