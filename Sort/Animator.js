function Animator(animationsElemente) {

    this.movingElements = [];
    this.animationsToStop = [];
    this.bubbleElements = [];

    this.displace = function(elementIndex, destination) {
        var presentIndex;
        var stepps = 50;
        var elementHypo = hypothenuse(destination.X - animationsElemente[elementIndex].location.X, destination.Y - animationsElemente[elementIndex].location.Y);

        // überprüfen, ob bereits elemente vohanden sind
        if(( presentIndex = this.movingElements.findIndex(x => x.I == elementIndex)) == -1) {
            // noch kein Element vorhanden
            this.movingElements.push({
                I: elementIndex,
                Vx: ((destination.X - animationsElemente[elementIndex].location.X) / stepps),
                Vy: ((destination.Y - animationsElemente[elementIndex].location.Y) / stepps),
                D: destination,
                Hv: elementHypo / stepps,
                H: elementHypo
            });
        } else {
            // Element vorhanden, also updaten
            this.movingElements[presentIndex] = {
                I: elementIndex,
                Vx: ((destination.X - animationsElemente[elementIndex].location.X) / stepps),
                Vy: ((destination.Y - animationsElemente[elementIndex].location.Y) / stepps),
                D: destination,
                Hv: elementHypo / stepps,
                H: elementHypo
            }
        }
    }

    this.update = function() {
        //console.log(animationsElemente);
        for (var i = 0; i < this.movingElements.length; i++) {
            animationsElemente[this.movingElements[i].I].location.X += this.movingElements[i].Vx;
            animationsElemente[this.movingElements[i].I].location.Y += this.movingElements[i].Vy;
            this.movingElements[i].H -= this.movingElements[i].Hv;

            if ((this.movingElements[i].H) < 0) {
                animationsElemente[this.movingElements[i].I].location.X = this.movingElements[i].D.X;
                animationsElemente[this.movingElements[i].I].location.Y = this.movingElements[i].D.Y;
                this.animationsToStop.push(i);
            }
            //console.log(this.movingElements[i].H);
        }

        for (var i = 0; i < this.animationsToStop.length; i++) {
            this.movingElements.splice(this.animationsToStop[i], 1);
        }
        this.animationsToStop = [];    
    }

    this.bubbleAnimation = function(indexA, indexB) {
        var stepps = 200;


        var wegY = Math.abs(animationsElemente[indexB].location.Y - animationsElemente[indexA].location.Y);
        console.log("Weg: " + wegY);
        console.log("Vy: " + ((animationsElemente[indexB].location.Y - animationsElemente[indexA].location.Y) / stepps));
        //INDEXA
        this.bubbleElements.push({
            Vy: ((animationsElemente[indexB].location.Y - animationsElemente[indexA].location.Y) / stepps),
            Hv: wegY / stepps,
            H: wegY,
            D: animationsElemente[indexB].location
        });
        
        wegY = Math.abs(animationsElemente[indexA].location.Y - animationsElemente[indexB].location.Y);
        console.log("Weg: " + wegY);
        console.log("Vy: " + ((animationsElemente[indexA].location.Y - animationsElemente[indexB].location.Y) / stepps));

        this.bubbleElements.push({
            Vy: ((animationsElemente[indexA].location.Y - animationsElemente[indexB].location.Y) / stepps),
            Hv: wegY / stepps,
            H: wegY,
            D: animationsElemente[indexA].location
        });

        console.log("Initial");
        console.log(this.bubbleElements);
        console.log("--");

        for (var i = 0; i < 100; i++) {

            animationsElemente[indexA].location.Y += this.bubbleElements[0].Vy;
            animationsElemente[indexB].location.Y += this.bubbleElements[1].Vy;

            console.log("Before Hypo translation");
            console.log(this.bubbleElements);
            

            this.bubbleElements[0].H -= this.bubbleElements[0].Hv;
            this.bubbleElements[1].H -= this.bubbleElements[1].Hv;

            console.log("After Hypo trans");
            console.log(this.bubbleElements[0].H);
            console.log(this.bubbleElements[1].H);
            console.log((this.bubbleElements[0].H < 0));
            console.log((this.bubbleElements[1].H < 0));
            if (this.bubbleElements[0].H < 0 && this.bubbleElements[1].H < 0) {
                animationsElemente[indexA].location.Y = this.bubbleElements[1].D.Y;
                animationsElemente[indexB].location.Y = this.bubbleElements[0].D.Y;
                console.log("done");
                break;
            }
            //clear();
            animationsElemente[indexA].draw();
            animationsElemente[indexB].draw();
        }
        this.bubbleElements = [];
    }

    function hypothenuse(a, b) {
        return Math.sqrt(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2))
    }
}