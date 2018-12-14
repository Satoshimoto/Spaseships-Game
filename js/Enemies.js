function Enemies(w, h, x, y) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
}

Enemies.prototype.speedX = 5;
Enemies.prototype.speedY = 5;


Enemies.prototype.update = function () {
    this.y += this.speedY;

    //ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(enemyImg, this.x, this.y, this.w, this.h);
}

Enemies.prototype.bossDraw = function () {

    this.y += this.speedY;
    if (this.y >= 130) {
        this.speedY = 0;
    }
    ctx.drawImage(bossImg, this.x, this.y, this.w, this.h);
}


Enemies.prototype.descrution = function () {
    ctx.drawImage(explosionImg, this.x, this.y, this.w, this.h);
}