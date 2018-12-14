function Bullet(w, h, x, y) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
}

Bullet.prototype.update = function () {
    this.y -= 10;
    ctx.drawImage(bulletImg, this.x, this.y, this.w, this.h)
}

Bullet.prototype.updateBoss = function () {
    this.y += 6;
    ctx.drawImage(bulletImg, this.x, this.y, this.w, this.h);
}

Bullet.prototype.explosion = function () {
    ctx.drawImage(explosionImg, this.x, this.y, 30, 30);
}