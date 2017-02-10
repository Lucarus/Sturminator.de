
function ControllManager() {

    this.controlls = [];

    this.addControll = function(controll) {
        this.controlls.push(controll);
    }

    this.draw = function() {
        this.controlls.forEach(function(controll) {
            controll.draw();
        });
    }

    this.mouseMove = function(mouseX, mouseY) {
        this.controlls.forEach(function(controll) {
            controll.mouseMove(mouseX, mouseY);
        });
    }

    this.gotClicked = function(mouseX, mouseY) {
        for (var i = 0; i < this.controlls.length; i++) {
            if (this.controlls[i].gotClicked(mouseX, mouseY)) {
                console.log(this.controlls[i].callback);
                return this.controlls[i].callback;
            }
        }
    }

}