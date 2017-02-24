function Sortitem(X, Y, width, height, radius, value) {

    // Eigenschaften
    this.text = value;
    this.value = value;
    this.location = {X: X, Y: Y};
    this.form = {H: height || 100, W: width || 30, R: radius || 10};
    this.color = "#222222";
    this.isUp = false;

    // Zeichnen
    this.draw = function() {
        // Wenn Element angeklickt und bewegt wird.
        if (this.isUp) {
            fill('rgba(0,255,0, 0.25)');
            rect(this.location.X + 10, this.location.Y + 10, this.form.W, this.form.H, this.form.R);
        }
        // Element selbst zeichnen
        fill(this.color);
        rect(this.location.X, this.location.Y, this.form.W, this.form.H, this.form.R);
        fill("white");
        text(this.text, this.location.X + 5, this.location.Y + 5, this.location.X + this.form.W - 5, this.location.Y + this.form.H - 5);
    }

    this.toggleUp = function() {
        this.isUp = !this.isUp;
        return(this.isUp);
    }
}