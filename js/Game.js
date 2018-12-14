window.addEventListener('load', function () {
    alert('Move your ship using arrows, if you want to shot click space. If you gain 10 points you will be fight with boss. The game goal is to kill the boss. Good luck')
});

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth * 0.3;
canvas.height = window.innerHeight * 0.8;
document.body.appendChild(canvas);

if (window.innerWidth < 750) {
    canvas.width = window.innerWidth;
}

if (window.innerHeight < 600) {
    canvas.height = window.innerHeight;
}
//
let ctx = canvas.getContext('2d');
//
let bullets = [];
//
let shipImg = new Image();
shipImg.src = 'img/spaceship.png';

//
let bulletImg = new Image();
bulletImg.src = 'img/bullet.png';
//
let spaceImg = new Image();
spaceImg.src = 'img/spaceMap.png';
//
let enemyImg = new Image();
enemyImg.src = 'img/enemyImg.png';

//
let explosionImg = new Image();
explosionImg.src = 'img/explosion.png';
//
let bossImg = new Image();
bossImg.src = 'img/boss.png';

//
let enemies = [];
//
number = 0;
//
scores = 0;
//
boss = 0;
//
bossArray = [];
//
bossLifes = 20;
//
bossBullets = [];
//
bossBulletsTimes = 0;
//
let scoresTable = document.getElementById('scores');
scoresTable.textContent = 'scores: ' + scores;
//
let gameOver = document.getElementById('gameover');
//
let winInfo = document.getElementById('youWon');
//

let Game = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
    init: function () {
        setInterval(function () {
            number++;
            var rand = Math.floor(Math.random() * (canvas.width - 40) + 1);
            player.update();
            player.draw();
            //
            if (scores == 10) {
                number = null;
                boss = 1;
                scores++;
                bossArray.push(new Boss(canvas.width * 0.4, canvas.height * 0.3, canvas.width / 2 - canvas.width * 0.4 / 2, -80))
            }
            //
            if (boss === 1) {
                bossBulletsTimes++
                bossArray[0].bossDraw();
                bossArray[0].move();
                if (bossBulletsTimes % 15 == 0) {
                    bossArray[0].shot();
                }

                bossBullets.forEach(function (bossShot, indexShot) {
                    bossShot.updateBoss();
                    if (bossShot.x >= player.x && bossShot.x <= player.x + player.w &&
                        bossShot.y <= player.y + player.h &&
                        bossShot.y >= player.y) {
                        canvas.width = 0;
                        removeEventListener('keyup', Game.keyEvent);
                        removeEventListener('keydown', Game.keyEvent);
                        winInfo.textContent = ''
                        gameOver.style.visibility = 'visible';
                        player.w = 0;
                        canvas.width = 0;
                    }
                    if (bossShot.y > canvas.height) {
                        bossBullets.splice(indexShot, 1);
                    }
                })

                bossArray.forEach(function (bossPosition) {
                    if ((bossPosition.x - player.x > player.w || bossPosition.x - player.x <= player.w && player.y > bossPosition.y + bossPosition.h) && (player.x - bossPosition.x <= bossPosition.w && player.y > bossPosition.y + bossPosition.h)) {
                        return false;
                    } else if ((bossPosition.x - player.x <= player.w && player.y >= bossPosition.y - player.h) && (player.x - bossPosition.x <= bossPosition.w && player.y >= bossPosition.y - player.h)) {
                        canvas.width = 0;
                        gameOver.style.visibility = 'visible';
                        removeEventListener('keyup', Game.keyEvent);
                        removeEventListener('keydown', Game.keyEvent);
                    }
                });


                enemies.forEach(function (index) {
                    enemies.splice(index, 6);
                });


                bossArray.forEach(function (itemBoss, indexBoss) {

                    bullets.forEach(function (bulletBoss, bulletIndex) {
                        if (bulletBoss.x >= itemBoss.x && bulletBoss.x <= itemBoss.x + itemBoss.w &&
                            bulletBoss.y <= itemBoss.y + itemBoss.h &&
                            bulletBoss.y >= itemBoss.y) {
                            bossLifes--;
                            bulletBoss.explosion();
                            bullets.splice(bulletIndex, 1);
                            if (bossLifes <= 0) {
                                itemBoss.descrution();
                                bossArray.splice(indexBoss, 1);
                                number = null;
                                boss = 0;
                                setTimeout(function () {
                                    canvas.width = 0;
                                    removeEventListener('keyup', Game.keyEvent);
                                    removeEventListener('keydown', Game.keyEvent);
                                    scores += 9;
                                    scoresTable.textContent = 'score: ' + scores;
                                    winInfo.style.visibility = 'visible';
                                    gameOver.textContent = '';
                                    player.w = 0;
                                }, 500)
                            }
                        }
                    })
                })
            }

            //
            enemies.forEach(function (item, index) {
                item.update();

                // if ((item.x <= player.x && item.x + item.w >= player.x && (item.y + item.h >= player.y || item.y >= player.y)) ||
                //     (item.x + item.w > player.x && item.x + item.w <= player.x + player.w && (item.y + item.h >= player.y || item.y >= player.y))) {

                // || (item.x - player.x <= item.w && item.y <= player.y - item.h) && (player.x - item.x <= item.w && item.y <= player.y - item.h)) 
                if ((player.x - item.x > item.w || player.x - item.x <= item.w && item.y > player.y + player.h) && (item.x - player.x <= item.w && item.y > player.y + player.h)) {
                    return false;
                } else if ((player.x - item.x <= item.w && item.y >= player.y - item.h) && (item.x - player.x <= item.w && item.y >= player.y - item.h)) {
                    enemies.splice(index, 1);
                    canvas.width = 0;
                    gameOver.style.visibility = 'visible';
                    removeEventListener('keyup', Game.keyEvent);
                    removeEventListener('keydown', Game.keyEvent);

                }

                if (item.y >= canvas.height) {
                    enemies.splice(index, 1);
                }
                bullets.forEach(function (item2, index2) {
                    if (item2.x >= item.x && item2.x <= item.x + item.w &&
                        item2.y <= item.y + item.h &&
                        item2.y >= item.y) {
                        bullets.splice(index2, 1);
                        item.descrution();
                        enemies.splice(index, 1);
                        scores++;
                        scoresTable.textContent = 'scores: ' + scores;
                    }
                })
            })

            for (var i = 0; i < bullets.length; i++) {
                bullets[i].update();
                if (bullets[i].y < 0) {
                    bullets.shift();
                }
            }
            //

            if (number != null && number % 30 == 0) {
                enemies.push(new Enemies(canvas.width * 0.08, canvas.height * 0.06, rand, 0));
            }

        }, 1000 / 30);
    },
    keyEvent: function (e) {
        var key_state = (e.type == 'keydown') ? true : false;

        switch (e.keyCode) {

            case 37:
                Game.left = key_state;
                break;

            case 38:
                Game.up = key_state;
                break;

            case 39:
                Game.right = key_state;
                break;

            case 40:
                Game.down = key_state;
                break;

            case 32:
                Game.space = key_state;
                if (Game.space) {
                    player.shot();
                }
                break;

        }
    },
}



window.onload = Game.init();

window.addEventListener('keyup', Game.keyEvent)
window.addEventListener('keydown', Game.keyEvent)