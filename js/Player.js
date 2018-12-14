function Player(w, h, x, y, speedX, speedY) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
}

Player.prototype.draw = function () {
    ctx.fillStyle = '#999';
    //ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(shipImg, this.x, this.y, this.w, this.h)
}

Player.prototype.update = function () {
    // ctx.fillStyle = '#333';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceImg, 0, 0, canvas.width, canvas.height);

    if (Game.right) {
        this.speedX += 1;
    }
    if (Game.left) {
        this.speedX -= 1;
    }
    if (Game.up) {
        this.speedY -= 1;
    }
    if (Game.down) {
        this.speedY += 1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.9;
    this.speedY *= 0.9;

    (this.x <= 0 ? this.x = 0 : (this.x + this.w >= canvas.width ? this.x = canvas.width - this.w : this.x = this.x));
    (this.y >= canvas.height - this.h ? this.y = canvas.height - this.h : (this.y <= 0 ? this.y = 0 : this.y = this.y));
}

Player.prototype.shot = function () {
    bullets.push(new Bullet(canvas.width * 0.02, canvas.height * 0.025, this.x + this.w / 2, this.y));
}




let player = new Player(canvas.width * 0.1, canvas.height * 0.07, canvas.width / 2 - 20, canvas.height - 50, 0, 0);