function NoclickRegion(location, form) {

    this.location = location;
    this.form = form;

    this.gotClicked = function(mouseX, mouseY) {
        if (areColliding(this.location.X, this.location.Y, this.form.W, this.form.H, mouseX, mouseY, 0, 0)) {
            return true;
        }
        return false;
    }
}