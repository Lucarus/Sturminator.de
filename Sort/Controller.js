
function Controller() {
    // Standardform für sortierelemente
    this.normForm = {W: 400, H: 30, R: 10};

    // Listen für die Elemente die sortiert werden
    this.newListAnimationCooldown = 0;
    this.listenMenge = 0;
    this.bubblesortElements = [];
    this.selectionsortElements = [];
    this.swapsortElements = [];

    // Sorthighlight der den Hintergrund für die Elemente die sortiert werden darstellt
    this.bubblesort_Highlight = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(78,227,130, 1)");
    this.bubblesort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,93,168, 1)");
    this.selectionsort_HighlightX = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,93,168, 1)");
    this.selectionsort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(78,227,130, 1)");
    this.selectionsort_HighlightS = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(245,225,75, 1)");
    this.swapsort_HighlightX = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,93,168, 1)");
    this.swapsort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(78,227,130, 1)");
    this.swapsort_HighlightS = [];
    this.liftedItemIndex = -1;

    // Sorts starten
    this.bubbleSort = function() { this.isBubblesorting = true; }
    this.selectionSort = function() { this.isSelectionsorting = true; }
    this.swapSort = function() { this.isSwapsorting = true; }
    this.staaahp = function() { this.isSwapsorting = this.isSelectionsorting = this.isBubblesorting = false; this.resetHighlights(); this.resetSorts(); }
    this.pause = function() {  this.isSwapsorting = this.isSelectionsorting = this.isBubblesorting = false; }

    this.resetHighlights = function() {
        this.bubblesort_Highlight = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H  + 10, 10, "", "rgba(78,227,130, 1)");
        this.bubblesort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,93,168, 1)");
        this.selectionsort_HighlightX = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,93,168, 1)");
        this.selectionsort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(78,227,130, 1)");
        this.selectionsort_HighlightS = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(245,225,75, 1)"); // rgba(255,110,87, 1)
        this.swapsort_HighlightX = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(0,93,168, 1)"); // rgba(31,150,197, 1)
        this.swapsort_HighlightI = new Sortitem(-1000,-1000, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(78,227,130, 1)");
        this.swapsort_HighlightS = [];
    }

    this.init = function() {
        //this.newLists(14);

        textSize(40);
        text("Bubblesort", 15, 10);
        text("Selectionsort", 15, 510);
        text("Swapsort", 15, 1010);
    }

    this.newLists = function(menge) {
        // zuerst alles stoppen
        this.staaahp();

        document.getElementById("successBubble").style.visibility = document.getElementById("successSelection").style.visibility = document.getElementById("successSwap").style.visibility = "hidden";
        document.getElementById("successBubble").style.width = document.getElementById("successSwap").style.width = document.getElementById("successSelection").style.width = "50px";
        document.getElementById("successBubble").style.height = document.getElementById("successSelection").style.height = document.getElementById("successSwap").style.height = "50px";

        for (var i = 0; i < this.bubblesortElements.length; i++) {
            this.displace(this.bubblesortElements[i], {X: 1700, Y: 450}, this.SWITCH_TIME);
            this.displace(this.selectionsortElements[i], {X: 1700, Y: 450}, this.SWITCH_TIME);
            this.displace(this.swapsortElements[i], {X: 1700, Y: 450}, this.SWITCH_TIME);
            this.listenAnordnen();
        }

        this.listenMenge = menge;
        this.newListAnimationCooldown = Math.round(this.SWITCH_TIME * GAME_FPS);
    }

    this.updateRoutineNewList = function() {
        if (this.newListAnimationCooldown <= 0 && this.newListAnimationCooldown > - 999) {
            this.bubblesortElements = [];
            this.selectionsortElements = [];
            this.swapsortElements = [];
            for (var i = 0; i < this.listenMenge; i++) {
                var value = random(5, 60);
                this.bubblesortElements.push(new Sortitem(-1000, 450, "value", this.normForm.H, this.normForm.R, value));
                this.swapsortElements.push(new Sortitem(-1000, 450, "value", this.normForm.H, this.normForm.R, value));
                this.selectionsortElements.push(new Sortitem(-1000, 450, "value", this.normForm.H, this.normForm.R, value));
                this.listenAnordnen();
            } 
            this.newListAnimationCooldown = -999;
        } else {
            this.newListAnimationCooldown--;
        }
    }

    this.sortStepp = function() { this.doNextStepp = true; };
    this.runThrough = function() { this.isSteppMode=false; };
    this.toggleSteppMode = function() { return(this.isSteppMode = !this.isSteppMode) };
    this.faster = function() {
        this.SWITCH_TIME -=  0.15; // in Sekunden
        this.SORT_DELAY -= 0.10; // in Sekunden
    }
    this.slower = function() {
        this.SWITCH_TIME +=  0.15; // in Sekunden
        this.SORT_DELAY += 0.10; // in Sekunden
    }

    this.resetSorts = function() {
        //Variablen für Sortanimation
        this.isSteppMode = false;
        this.doNextStepp = false;
        this.SWITCH_TIME =  0.31; // in Sekunden
        this.SORT_DELAY = 0.21; // in Sekunden
        //Bubblesort
        this.isBubblesorting = false;
        this.bubbleSort_i = 1;  // 1 ist wichtig
        this.bubbleSort_x = 0;
        this.bubbleSort_nextSteppIn = 0;
        //Selectionsort
        this.isSelectionsorting = false;
        this.selectionSort_i = 0;
        this.selectionSort_x = 0;
        this.selectionSort_nextSteppIn = 0;
        this.selectionSort_smallestIndex = 0;
        this.selectionSort_smalest = 999999;
        //Inserstionsort
        this.isSwapsorting = false;
        this.swapSort_i = 0;
        this.swapSort_smallerMenge = 0;
        this.swapSort_nextSteppIn = 0;
        this.swapSort_countingSmallest = false;
        this.swapSort_x = 0;
        this.swapSort_found = false;
    }

    //Variablen für Sortanimation
    this.isSteppMode = false;
    this.doNextStepp = false;
    this.SWITCH_TIME =  0.1; // in Sekunden
    this.SORT_DELAY = 0.1; // in Sekunden
    //Bubblesort
    this.isBubblesorting = false;
    this.bubbleSort_i = 1;  // 1 ist wichtig
    this.bubbleSort_x = 0;
    this.bubbleSort_nextSteppIn = 0;
    //Selectionsort
    this.isSelectionsorting = false;
    this.selectionSort_i = 0;
    this.selectionSort_x = 0;
    this.selectionSort_nextSteppIn = 0;
    this.selectionSort_smallestIndex = 0;
    this.selectionSort_smalest = 999999;
    //Inserstionsort
    this.isSwapsorting = false;
    this.swapSort_i = 0;
    this.swapSort_smallerMenge = 0;
    this.swapSort_nextSteppIn = 0;
    this.swapSort_countingSmallest = false;
    this.swapSort_x = 0;
    this.swapSort_found = false;

    this.idleSortWait = 90;
    this.idleMode = false;
    this.idleWaitTicks = 120;

    // Alle Sortieritems updaten lassen
    this.update = function() {


        // IDLE mode
        if (this.idleMode) {
            if (!this.isBubblesorting && !this.isSelectionsorting && !this.isSwapsorting) {
                if (this.idleWaitTicks <= 0) {
                    if (this.idleSortWait == 90) controller.newLists(14);
                
                    if (this.idleSortWait <= 0) {
                        document.getElementById("startSort").src = "img/play.png";
                        displayPlay = false;
                        this.bubbleSort();
                        this.swapSort();
                        this.selectionSort();
                        this.idleWaitTicks = 120;
                        this.idleSortWait = 90; 
                    } else {
                        this.idleSortWait--;
                    }
                } else {
                    this.idleWaitTicks--;
                }
            }
        }

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
                            this.bubblesort_HighlightI.location = {
                                X: this.bubblesortElements[this.bubbleSort_i].location.X - 5,
                                Y: this.bubblesortElements[this.bubbleSort_i].location.Y - 5
                            }
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

                        document.getElementById("successBubble").style.visibility = "visible";
                        document.getElementById("successBubble").style.height = "75px";
                        document.getElementById("successBubble").style.width = "75px";
                        

                        this.bubblesort_Highlight.location = {X: -1000, Y: -1000};
                        this.bubblesort_HighlightI.location = {X: -1000, Y: -1000};
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
                        this.selectionsort_HighlightI.location = {X:this.selectionsortElements[this.selectionSort_x].location.X - 5 , Y: this.selectionsortElements[this.selectionSort_x].location.Y - 5 };
                        // innere schleife
                        if (this.selectionSort_i < this.selectionsortElements.length) {
                            // Highligt für Compare objekt
                            this.selectionsort_HighlightX.location = {X:this.selectionsortElements[this.selectionSort_i].location.X - 5 , Y: this.selectionsortElements[this.selectionSort_i].location.Y - 5 };
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

                        document.getElementById("successSelection").style.visibility = "visible";
                        document.getElementById("successSelection").style.width = "75px";
                        document.getElementById("successSelection").style.height = "75px";
                    }
                } else {
                    this.selectionSort_nextSteppIn--;
                }
            }
        }
        
        // Inserstionsort Sortanimation IST SCHEI?E
        /*
            Um mit den Animationen leichter arbeiten zu können wird die Sortfunktion in die Updateschleife ausgelagert.
            Das heißt es wird ~ jede Sekunde ein schritt in dem Algorithmus durchlaufen.
        */

        // SWAP-Sort

        if (this.isSwapsorting) {
            // für den Stepp mode
            if (this.isSteppMode && this.doNextStepp) this.swapSort_nextSteppIn = 0;
            // nur Ausführen wenn im Stepp
            if (this.doNextStepp) {
                if (this.swapSort_nextSteppIn <= 0) {
                    if (this.swapSort_i < this.swapsortElements.length - 1) {
                        // Highlight
                        this.swapsort_HighlightI.location = {X: this.swapsortElements[this.swapSort_i].location.X - 5, Y: this.swapsortElements[this.swapSort_i].location.Y - 5};
                        // Standard Delay
                        this.swapSort_nextSteppIn = Math.round(this.SORT_DELAY * GAME_FPS);

                        if (!this.swapSort_countingSmallest) {
                            // start counting
                            this.swapSort_countingSmallest = true;

                            this.swapSort_smallerMenge = 0;
                            // Highlight löschen
                            this.swapsort_HighlightS = [];
                            this.swapSort_x =  this.swapSort_i + 1;
                        }

                        this.swapsort_HighlightX.location = {X: -1000, Y: -1000};
                        if (this.swapSort_x < this.swapsortElements.length) {
                            this.swapsort_HighlightX.location = { X:this.swapsortElements[this.swapSort_x].location.X - 5, Y: this.swapsortElements[this.swapSort_x].location.Y - 5}              
                            if (this.swapsortElements[this.swapSort_i].value > this.swapsortElements[this.swapSort_x].value) {
                                // für jedes gezählte Element Highlicht hinzufügen
                                this.swapsort_HighlightS.push(new Sortitem(this.swapsortElements[this.swapSort_x].location.X - 5, this.swapsortElements[this.swapSort_x].location.Y - 5, this.normForm.W + 10, this.normForm.H + 10, 10, "", "rgba(245,225,75, 1)"));
                                this.swapSort_smallerMenge++;
                            }
                            this.swapSort_x++;
                        } else {
                            this.swapSort_countingSmallest = false;
                        }

                        if (!this.swapSort_countingSmallest) {
                            if (this.swapSort_smallerMenge > 0) {
                                // 3ertausch
                                // Elemente tauschen, nachdem die inntereschleife einmal durchlaufen wurde
                                temp = this.swapsortElements[this.swapSort_i];
                                this.swapsortElements[this.swapSort_i] = this.swapsortElements[this.swapSort_i + this.swapSort_smallerMenge];
                                this.swapsortElements[this.swapSort_i + this.swapSort_smallerMenge] = temp;
                                // Animationsmanager mit der Bewegungsanimation beauftragen
                                this.displace(this.swapsortElements[this.swapSort_i + this.swapSort_smallerMenge], {X: this.swapsortElements[this.swapSort_i].location.X, Y: this.swapsortElements[this.swapSort_i].location.Y}, this.SWITCH_TIME);
                                this.displace(this.swapsortElements[this.swapSort_i], {X:this.swapsortElements[this.swapSort_i + this.swapSort_smallerMenge].location.X, Y:this.swapsortElements[this.swapSort_i + this.swapSort_smallerMenge].location.Y}, this.SWITCH_TIME);    
                                this.swapSort_nextSteppIn = Math.round(this.SWITCH_TIME * GAME_FPS);
                            } else {
                                this.swapSort_i++;
                            }
                        }
                    } else {
                        // Reset
                        this.swapSort_i = 0;
                        this.isSwapsorting = false;
                        this.swapsort_HighlightI.location = {X: -1000, Y: -1000};

                        document.getElementById("successSwap").style.visibility = "visible";
                        document.getElementById("successSwap").style.height = "75px";
                        document.getElementById("successSwap").style.width = "75px";
                    }
                } else {
                    this.swapSort_nextSteppIn--;
                }
            }
        }

        // next stepp nach jedem stepp zurücksetzen
        this.doNextStepp = false;

        // Animationen updaten
        this.animationUpdate();

        // diferse Updatesachen
        this.updateRoutineNewList();

        // ! Achtung !
        // Die Reihenfolge ist hier entscheident
        // Sortelement Highlight zeichenen
        this.bubblesort_Highlight.draw();
        this.bubblesort_HighlightI.draw();
        this.selectionsort_HighlightI.draw();
        this.selectionsort_HighlightS.draw();
        this.selectionsort_HighlightX.draw();
        this.swapsort_HighlightS.forEach(function(sorthighlight) {
            sorthighlight.draw();
        });
        this.swapsort_HighlightI.draw();
        this.swapsort_HighlightX.draw();

        // alle Elemente zeichnen
        this.bubblesortElements.forEach(function(sortitem) {
            sortitem.draw();
        });
        this.selectionsortElements.forEach(function(sortitem){
            sortitem.draw();
        });
        this.swapsortElements.forEach(function(sortitem) {
            sortitem.draw();
        });

        // Update text
        fill(0, 93, 168);
        textSize(28);
        text("Bubblesort", 20, 105);
        text("Selectionsort", 520, 105);
        text("Swapsort", 1020, 105);
        textSize(42);
        text("Sortieralgorithmen", 600, 52);
    }

    this.listenAnordnen = function() {
        this.placeInOrder(this.bubblesortElements, 20);
        this.placeInOrder(this.selectionsortElements, 520);
        this.placeInOrder(this.swapsortElements, 1020);
    }

    this.placeInOrder = function(sortedList, X) {
        var compHeight = 75;
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


    function hypothenuse(a, b) {
        return Math.sqrt(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2))
    }
}
