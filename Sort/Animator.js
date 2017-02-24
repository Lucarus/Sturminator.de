function Animator(animationsElemente) {

    this.movingElements = [];
    this.animationsToStop = [];

    this.displace = function(elementIndex, destination, dauerSekunden) {
        var presentIndex;
        var stepps = Math.round(dauerSekunden * GAME_FPS);
        if (!dauerSekunden) stepps = 40;
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

    function hypothenuse(a, b) {
        return Math.sqrt(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2))
    }
}