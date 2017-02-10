function Button(location, form, caption, callback) {

    this.caption = caption
    this.location = location;
    this.form = form;
    this.callback = callback;

    this.addClickevent = function(functionToExecute) {

    }

    this.gotClicked = function(mouseX, mouseY) {
        if (areColliding(this.location.X, this.location.Y, this.form.W, this.form.H, mouseX, mouseY, 0, 0)) {
            return true;
        }
        return false;
    }

    this.mouseMove = function(mouseX, mouseY) {
        //NOT USED BOT NEEDED
    }

    this.draw = function() {
        fill("green");
        rect(this.location.X, this.location.Y, this.form.W, this.form.H, 20);
        fill("white");
        text(this.caption, this.location.X, this.location.Y, this.location.X + this.form.W, this.location.Y + this.form.H);
    }
}