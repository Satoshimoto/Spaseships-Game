function Boss(w, h, x, y) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
}

Boss.prototype = new Enemies;

Boss.prototype.constructor = Boss;

Boss.prototype.move = function () {
    if (this.y >= 130) {
        this.x += this.speedX;
        if (this.x <= 0) {
            this.speedX = -this.speedX;
        } else if (this.x + this.w >= canvas.width) {
            this.speedX = -this.speedX;
        }
    }
}


Boss.prototype.shot = function () {
    if (this.y >= 130) {
        var bx = this.x + this.w / 2;
        var by = this.y + this.h;
        bossBullets.push(new Bullet(canvas.width * 0.02, canvas.height * 0.025, bx, by));
    }
}