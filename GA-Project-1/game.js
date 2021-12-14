// creating the game dimensions
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 480;

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
let popupScore = document.getElementById("popup-score");
const play = document.getElementById("play");
const playAgain = document.getElementById("playagain");
const congrats = document.getElementById("text");

// control variables that switch on or off depending on if a key has been pressed or released
let leftArrow = null;
let rightArrow = null;
let upArrow = null;
let downArrow = null;

// Game functionality variables
let frame = 0;
let score = 0;
let endGame = false;
let spawnRate = 1000;

// arrays allow us to create multiple instances of the object on screen at a time by pushing objects into the array and allows us to remove objects from the screen by removing them from the array
let missiles = [];
let explosions = [];
let enemies = [];
let bosses = [];
let bossMissiles = [];

// Game audio elements
const soundtrack = new Audio();
soundtrack.src = "audio/soundtrack.mp3";
const bossMusic =  new Audio();
bossMusic.src =  "audio/Intro.mp3";
const sound = new Audio();
sound.src = "audio/missile.mp3";

// making things look pretty by adding in the sprites and background images
const backgroundLayer1 = new Image();
backgroundLayer1.src = "resources/farback.gif";

// These represpent the backgroundLayer position in space. The backgroundLayer will be used in two images repeated one after the other
// The B position is the with of the image as it is repeated
bg1PosA = 0;
bg1PosB = 1782;

const backgroundLayer2 = new Image();
backgroundLayer2.src = "resources/starfield.png";
bg2PosA = 0;
bg2PosB = 800;
bg3PosA = -400;
bg3PosB = 800;
bg4PosA = -650;
bg4PosB = 800;

const backgroundLayer3 = new Image();
backgroundLayer3.src = "resources/starfieldReversed.png";

const planet1 = new Image();
planet1.src = "resources/planet1.png";
planet1Pos = 0;
const planet2 = new Image();
planet2.src = "resources/planet2.png";
planet2Pos = 0;

const playerImage = new Image();
playerImage.src = "resources/Ship1.png";
const playerImageWidth = 33.6;
const playerImageHeight = 24;
let playerImageFrame = 0;

const playerMissile = new Image();
playerMissile.src = "resources/Missile.png";
const playerMissileWidth = 51;
const playerMissileHeight = 24;
let playerMissileFrame = 0;

const bossMissile = new Image();
bossMissile.src = "resources/bossMissile.png";
const bossMissileWidth = 58;
const bossMissileHeight = 20;
let bossMissileFrame = 0;

const explosionImg = new Image();
explosionImg.src = "resources/Enemies/explosion.png";
const explosionWidth = 32;
const explosionHeight = 30;

const explosion2Img = new Image();
explosion2Img.src = "resources/Enemies/explosion2.png";
const explosion2Width = 32;
const explosion2Height = 30;

// Enemy Sprites - Width & height is used to scale images to dimensions to hitbox for each enemy
const enemyType1 = new Image();
enemyType1.src = "resources/Enemies/enemy1.png";
enemyType1Width = 37;
enemyType1Height = 33;

const enemyType2 = new Image();
enemyType2.src = "resources/Enemies/enemy2.png";
enemyType2Width = 32;
enemyType2Height = 36;

const enemyType3 = new Image();
enemyType3.src = "resources/Enemies/enemy3.png";
enemyType3Width = 36;
enemyType3Height = 32;

const enemyType4 = new Image();
enemyType4.src = "resources/Enemies/enemy4.png";
enemyType4Width = 34;
enemyType4Height = 29;

const enemyType5 = new Image();
enemyType5.src = "resources/Enemies/enemy5.png";
enemyType5Width = 15;
enemyType5Height = 15;

const enemyType6 = new Image();
enemyType6.src = "resources/Enemies/enemy6.png";
enemyType6Width = 34;
enemyType6Height = 31;

const enemyType7 = new Image();
enemyType7.src = "resources/Enemies/enemy7.png";
enemyType7Width = 18;
enemyType7Height = 20;

const enemyType8 = new Image();
enemyType8.src = "resources/Enemies/enemy8.png";
enemyType8Width = 18;
enemyType8Height = 20;

const enemyType9 = new Image();
enemyType9.src = "resources/Enemies/enemy9.png";
enemyType9Width = 20;
enemyType9Height = 16;

const enemyTypeBoss = new Image();
enemyTypeBoss.src = "resources/Enemies/BossShell.png";
const bossWidth = 138;
let bossPos = canvas.width;

const bossShipImg = new Image();
bossShipImg.src = "resources/Enemies/BossShip.png";
bossShipPos = canvas.width;
const bossShipWidth = 152;
const bossShipHeight = 166;

// Creating the player ship class
class Ship {
  constructor() {
    this.x = 10;
    this.y = canvas.height / 2 - 66 / 2;
    this.vy = 10;
    this.vx = 10;
    this.currentX = 10;
    this.currentY = canvas.height / 2 - 66 / 2;
    this.width = 66;
    this.height = 66;
    this.life = 1;
  }
  // updates ship position in space
  update() {
    // limits the ship to not move beyond the bottom of the canvas
    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
    }
    // limits the ship to not move beyond the top of the canvas
    if (this.y < 0) {
      this.y = 0;
    }
    // limits the ship to not move beyond the right of the canvas
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
    }
    if (this.x < 0) {
      this.x = 0;
    }

    // allows free movement of the ship in space
    if (upArrow) {
      this.y -= this.vy;
    }
    if (downArrow) {
      this.y += this.vy;
    }
    if (leftArrow) {
      this.x -= this.vx;
    }
    if (rightArrow) {
      this.x += this.vx;
    }
  }
  // draws the ship in space, leaving as a square for the moment to get the bare bones of the game working will replace with a sprite
  draw() {
    if (upArrow) {
      playerImageFrame = 1;
    }
    if (!upArrow) {
      playerImageFrame = 0;
    }
    if (downArrow) {
      playerImageFrame = 3;
    }
    context.drawImage(
      playerImage,
      playerImageFrame * 33.6,
      0,
      playerImageWidth,
      playerImageHeight,
      this.x,
      this.y - 4,
      this.width,
      this.height * 1.3
    );
  }
}

const ship = new Ship();

// Create an enemy class which will give basics of each enemy
class Enemy {
  constructor(x, y, vx, vy, type, score, radius, radians) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = 50;
    this.height = 50;
    this.health = 10;
    this.type = type;
    this.score = score;
    this.radius = radius;
    this.radians = radians;
  }
  draw() {
    context.fillStyle = "";
    context.fillRect(this.x, this.y, 0, 0);
  }
  update() {
    this.draw();
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    // will have screen path based on enemy.type
  }
}

// function that creates wave based on object properties
function getCurrentWave() {
  //each wave appears on screen with object properties based on current frame

  if (frame > 450 && frame < 1000) {
    const wave1 = {
      type: 1,
      x: canvas.width,
      y: canvas.height / 2 - 25,
      vx: -4,
      vy: 0,
      radians: 0,
    };
    return wave1;
  }
  if (frame > 1000 && frame < 1150) {
    const wave2 = {
      type: 2,
      x: canvas.width,
      y: canvas.height / 2 + canvas.height / 4,
      vx: -10,
      vy: -2,
    };
    return wave2;
  }
  if (frame > 1150 && frame < 1300) {
    const wave3 = {
      type: 3,
      x: canvas.width,
      y: canvas.height / 2 - canvas.height / 4,
      vx: -10,
      vy: +2,
    };
    return wave3;
  }
  if (frame > 1300 && frame < 1400) {
    const wave2 = {
      type: 2,
      x: canvas.width,
      y: canvas.height / 2 + canvas.height / 4,
      vx: -10,
      vy: -2,
    };
    return wave2;
  }
  if (frame > 1400 && frame < 1500) {
    const wave3 = {
      type: 3,
      x: canvas.width,
      y: canvas.height / 2 - canvas.height / 4,
      vx: -10,
      vy: +2,
    };
    return wave3;
  }
  if (frame > 1500 && frame < 1750) {
    const wave2 = {
      type: 2,
      x: canvas.width,
      y: canvas.height / 2 + canvas.height / 4,
      vx: -10,
      vy: -2,
    };
    return wave2;
  }
  if (frame > 1750 && frame < 2000) {
    const wave1 = {
      type: 1,
      x: canvas.width,
      y: ship.y,
      vx: -10,
      vy: 0,
    };
    return wave1;
  }
  if (frame > 2000 && frame < 2500) {
    const wave4 = {
      type: 4,
      x: canvas.width,
      y: canvas.height / 2 - 25,
      vx: -6,
      vy: 0,
    };
    return wave4;
  }
  if (frame > 500 && frame < 3500) {
    const wave5 = {
      type: 5,
      x: canvas.width,
      y: canvas.height / 2 - 25,
      vx: -6,
      vy: 0,
    };
    return wave5;
  }
  if (frame > 3500 && frame < 4500) {
    const wave6 = {
      type: 6,
      x: canvas.width,
      y: Math.random() * (canvas.height - 50 - 50) + 50,
      vx: -18,
      vy: 0,
    };
    return wave6;
  }
  if (frame > 4500 && frame < 5000) {
    const wave7 = {
      type: 7,
      x: ship.x,
      y: 0,
      vx: 0,
      vy: +7,
    };
    return wave7;
  }
  if (frame > 5000 && frame < 5500) {
    const wave8 = {
      type: 8,
      x: ship.x,
      y: canvas.height - 25,
      vx: 0,
      vy: -9,
    };
    return wave8;
  }
  if (frame > 5500 && frame < 6000) {
    const wave9 = {
      type: 9,
      x: 0,
      y: ship.y,
      vx: +6,
      vy: 0,
    };
    return wave9;
  }
  return null;
}
function createEnemy() {
  const wave = getCurrentWave();
  if (wave === null) {
    return;
  }
  // enemy properties
  const x = wave.x;
  const y = wave.y;
  const vx = wave.vx;
  const vy = wave.vy;
  const type = wave.type;

  // spawn enemies
  enemies.push(new Enemy(x, y, vx, vy, type));
}
function spawnEnemies() {
  setInterval(createEnemy, spawnRate);
}

class Missile {
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    this.vx = vx * 2;
    this.width = playerMissileWidth;
    this.height = playerMissileHeight;
    this.damage = 10;
    this.visible = false;

    this.sound2 = new Audio();
    this.sound2.src = "audio/explosion.wav";
  }
  draw() {
    context.drawImage(
      playerMissile,
      0,
      0,
      playerMissileWidth / 4,
      playerMissileHeight,
      this.x - playerMissileWidth + 10,
      this.y - 12.5,
      this.width,
      this.height * 2
    );
  }
  update() {
    this.draw();
    this.x = this.x + this.vx;
  }
}

class BossMissile {
  constructor(x, y, vx) {
    this.x = x;
    this.y = y;
    this.vx = vx * 2;
    this.width = bossMissileWidth;
    this.height = bossMissileHeight;
    this.damage = 10;
    this.visible = false;

    this.sound2 = new Audio();
    this.sound2.src = "audio/explosion.wav";
  }
  draw() {
    context.drawImage(
      bossMissile,
      0,
      0,
      bossMissileWidth,
      bossMissileHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();
    this.x = this.x + this.vx;
  }
}

class Boss {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = bossShipWidth;
    this.height = bossShipHeight;
    this.score = score;
    this.health = 1500;
  }
  draw() {
    context.drawImage(
      bossShipImg,
      0,
      0,
      bossShipWidth,
      bossShipHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    if (this.x < canvas.width - bossShipWidth * 2) {
      this.vx = 0;
    }
  }
}

function getBoss() {
  if (frame > 100) {
    const boss1 = {
      type: 1,
      x: canvas.width,
      y: canvas.height / 2 - 25,
      vx: -1,
      vy: 0,
    };
    return boss1;
  }
}

function spawnBoss() {
  const boss = getBoss();
  if (boss === null) {
    return;
  }
  // boss properties
  const x = boss.x;
  const y = boss.y;
  const vx = boss.vx;
  const vy = boss.vy;
  const health = boss.health;

  // spawn boss
  if (bosses.length < 1) {
    bosses.push(new Boss(x, y, vx, vy, health));
  }
}

// clear canvas between animations & animates the game
function animate() {
  // frame allows me to track in the game the current "time" so I can send enemy waves at different frames
  frame = requestAnimationFrame(animate);
  soundtrack.play();

  // Clears the canvas between each frame
  context.clearRect(0, 0, canvas.width, canvas.height);

  // This creates scrolling backgrounds by repeating the same image twice and if one scrolls off the screen as far as it's image length it's x coordinate is repeated
  bg1PosA = bg1PosA - 0.2;
  bg1PosB = bg1PosB - 0.2;
  if (bg1PosA < -1782) bg1PosA = 1782;
  if (bg1PosB < -1782) bg1PosB = 1782;
  context.drawImage(backgroundLayer1, bg1PosA, 0);
  context.drawImage(backgroundLayer1, bg1PosB, 0);

  planet1Pos = planet1Pos - 0.3;
  context.drawImage(planet1, planet1Pos + 1500, -100);

  //
  // End game section
  //

  if (frame > 6500) {
    // console.log(bossPos)
    soundtrack.pause()
    bossMusic.play()
    if (bossPos > canvas.width - bossWidth) {
      bossPos = bossPos - 0.5;
    }
    if (bossPos <= canvas.width - bossWidth) {
      bossPos = canvas.width - bossWidth;
    }
    endGame = true;
    context.drawImage(enemyTypeBoss, bossPos, 0);
    spawnBoss();
  }

  bosses.forEach((boss) => {
    boss.update();

    bossMissiles.forEach((bossMissile, index) => {
      bossMissile.update();

      // this removes the missile if it's position is outside of the canvas as game was lagging when there were loads of missiles travellin off screen
      if (bossMissile.x > canvas.width) {
        bossMissiles.splice(index, 1);
      }

      // Boss missiles & player ship hit detection
      const bossMissileHit = Math.hypot(
        ship.x - bossMissile.x,
        ship.y + 20 - bossMissile.y
      );

      if (bossMissileHit < 25) {
        console.log("player ship was hit");
        console.log(`Player lives left are: ${ship.life}`);
        ship.life--;
        // need to create invulnerability function after play has been hit and loses life as hit detection continues and removes all the player lives for the duration of being hit
        // ENDS THE GAME IF THE PLAYER LIVES GO TO ZERO
        if (ship.life < 1) {
          cancelAnimationFrame(frame);
          document.getElementById("hidden").classList.remove("hidden");
        }
      }
    });

    // Boss firing frequency based on current frame & how much health the boss has left
    if (boss.x === 495 && frame % 100 === 0) {
      // console.log('boss should fire 1')
      bossMissiles.push(new BossMissile(boss.x, boss.y + 35, -6));
    }
    if (boss.x === 495 && frame % 70 === 0 && boss.health < 1250) {
      // console.log('boss should fire 2')
      bossMissiles.push(new BossMissile(boss.x, boss.y + 35, -6));
    }
    if (boss.x === 495 && frame % 30 === 0 && boss.health < 800) {
      // console.log('boss should fire 3')
      bossMissiles.push(new BossMissile(boss.x, boss.y + 35, -6));
    }
    // boss movement based on where player is in space
    if (boss.x === 495) {
      if (boss.y < 0) {
        boss.y = 0;
      }
      boss.y += (ship.y - (boss.y + boss.height / 5)) * 0.075;
    }

    // hit detection when missile hits boss
    missiles.forEach((missile) => {
      if (
        missile.x > boss.x + bossShipWidth / 2 &&
        missile.y > boss.y &&
        missile.y < boss.y + bossShipHeight - 10
      ) {
        context.drawImage(explosionImg, boss.x + bossShipWidth / 2, missile.y);
        missile.sound2.play();
        missiles.shift();
        if (boss.x === 495) {
          score += 10;
          boss.health -= 25;
          console.log(boss.health);
        }
        if (boss.health < 0) {
          endGameOver = true;
          boss.vx -= 4;
          boss.vy += 4.5;
          context.drawImage(explosion2Img, missile.x, missile.y);
        }
      }
    });
    console.log(boss.y);
    if (boss.y > canvas.height + bossShipHeight) {
      congrats.innerText = "You Won!";
      document.getElementById("hidden").classList.remove("hidden");
    }
  });

  //
  // End of endgame section
  //

  // background layering
  bg3PosA = bg3PosA - 2.5;
  bg3PosB = bg3PosB - 2.5;
  if (bg3PosA < -800) bg3PosA = 800;
  if (bg3PosB < -800) bg3PosB = 800;
  context.drawImage(backgroundLayer2, bg3PosA, 0);
  context.drawImage(backgroundLayer2, bg3PosB, 0);

  ship.update();
  ship.draw();
  planet2Pos = planet2Pos - 0.6;
  context.drawImage(planet2, planet2Pos - 200, 200);

  // runs the missile.update function each time a new missile is pushed into the missiles array
  missiles.forEach((missile, index) => {
    missile.update();

    // this removes the missile if it's position is outside of the canvas as game was lagging when there were loads of missiles travellin off screen
    if (missile.x > canvas.width) {
      missiles.splice(index, 1);
    }
  });

  //Creates new enemies on screen
  enemies.forEach((enemy, index) => {
    enemy.update();

    // this removes enemies from screen. Both missile and enemy needs to be removed if they go outside canvas area as both indcies will become offset and missile can shoot through all enemies if lined up
    if (enemy.x + enemy.width < 0) {
      enemies.splice(index, 1);
    }
    // enemy bahaviour and images based on type
    if (enemy.type === 1) {
      context.drawImage(
        enemyType1,
        0,
        0,
        enemyType1Width,
        enemyType1Height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
      let radians = 0
      setInterval(function () {
        // if (counter == 0.5) inc = -1;
        // if (counter == -1.5) inc = +1;
        console.log(radians)
        radians += 0.05
        enemy.y = (enemy.y +  Math.cos(radians) /Math.PI)
        enemy.vy = -0.5
      }, 10);
    }
    if (enemy.type === 2) {
      context.drawImage(
        enemyType2,
        0,
        0,
        enemyType2Width,
        enemyType2Height,
        enemy.x + 10,
        enemy.y - 5,
        enemy.width,
        enemy.height
      );
    }
    if (enemy.type === 3) {
      context.drawImage(
        enemyType3,
        0,
        0,
        enemyType3Width,
        enemyType3Height,
        enemy.x + 15,
        enemy.y,
        enemy.width,
        enemy.height
      );
    }
    if (enemy.type === 4) {
      context.drawImage(
        enemyType4,
        0,
        0,
        enemyType4Width,
        enemyType4Height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
      let counter = 0;
      let inc = +1;
      setInterval(function () {
        if (counter == 2) inc = -0.2;
        if (counter == -2) inc = +0.2;
        counter += inc;
        enemy.vy = 8 * Math.sin(counter);
      }, 10);
    }

    if (enemy.type === 5) {
      context.drawImage(
        enemyType5,
        0,
        0,
        enemyType5Width,
        enemyType5Height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );

      let radians = 0
      setInterval(function () {
        // if (counter == 0.5) inc = -1;
        // if (counter == -1.5) inc = +1;
        console.log(radians)
        radians += 0.05
        enemy.y = (enemy.y +  Math.cos(radians) /Math.PI)
        enemy.vy = -0.5
        enemy.x = enemy.x + Math.sin(radians)
        enemy.vx = -20
        
      }, 10);

    }

    if (enemy.type === 6) {
      context.drawImage(
        enemyType6,
        0,
        0,
        enemyType6Width,
        enemyType6Height,
        enemy.x + 15,
        enemy.y,
        enemy.width * 3,
        enemy.height * 2
      );
    }

    if (enemy.type === 7) {
      context.drawImage(
        enemyType7,
        0,
        0,
        enemyType7Width,
        enemyType7Height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    }
    if (enemy.type === 8) {
      context.drawImage(
        enemyType8,
        0,
        0,
        enemyType8Width,
        enemyType8Height,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    }
    if (enemy.type === 9) {
      context.drawImage(
        enemyType9,
        0,
        0,
        enemyType9Width,
        enemyType9Height,
        enemy.x - 5,
        enemy.y,
        enemy.width * 1.1,
        enemy.height * 1.1
      );
    }

    // checks distance between player ship and enemy ships
    const distPlayer = Math.hypot(ship.x - enemy.x, ship.y - enemy.y);

    if (distPlayer < 45) {
      console.log("player ship was hit");
      console.log(`Player lives left are: ${ship.life}`);
      ship.life--;
      // need to create invulnerability function after play has been hit and loses life as hit detection continues and removes all the player lives for the duration of being hit
      // ENDS THE GAME IF THE PLAYER LIVES GO TO ZERO
      if (ship.life < 1) {
        cancelAnimationFrame(frame);
        document.getElementById("hidden").classList.remove("hidden");
      }
    }

    // checking if missiles have hit any of the enemies
    missiles.forEach((missile) => {
      // finds the distance between the missile & spawned enemy
      const distMissile = Math.hypot(
        missile.x - enemy.x,
        missile.y - enemy.y - 25
      );

      //objects touch then remove the enemy based on it's position in it's array index.
      // need to include enemy health element and how much damage each missile will do
      if (distMissile < 27) {
        context.drawImage(explosionImg, enemy.x, enemy.y);
        missile.sound2.play();
        enemies.splice(index, 1);
        missiles.splice(index, 1);
        context.drawImage(explosion2Img, enemy.x, enemy.y);

        if (enemy.type === 1) {
          score += 100;
        }
        if (enemy.type === 2 || enemy.type === 3 || enemy.type === 9) {
          score += 150;
        }
        if (enemy.type === 4 || enemy.type === 5) {
          score += 75;
        }
        if (enemy.type === 6) {
          score += 250;
        }
        if (enemy.type === 7 || enemy.type === 8) {
          score += 300;
        }
      }
    });
  });

  // Forground image needs to come last
  bg2PosA = bg2PosA - 2.8;
  bg2PosB = bg2PosB - 2.8;
  if (bg2PosA < -800) bg2PosA = 800;
  if (bg2PosB < -800) bg2PosB = 800;
  context.drawImage(backgroundLayer2, bg2PosA, 0);
  context.drawImage(backgroundLayer2, bg2PosB, 0);

  bg4PosA = bg2PosA - 3.3;
  bg4PosB = bg2PosB - 3.3;
  if (bg4PosA < -800) bg4PosA = 800;
  if (bg4PosB < -800) bg4PosB = 800;
  context.drawImage(backgroundLayer3, bg2PosA, 0);
  context.drawImage(backgroundLayer3, bg2PosB, 0);

  livesDisplay.innerText = ship.life.toString();
  scoreDisplay.innerText = score.toString();
  popupScore.innerText = score.toString();
}

// Control functions that handle key presses
function handleKeyDown(event) {
  //   console.log(event.key);
  switch (event.key) {
    //Left arrow
    case "a":
      leftArrow = true;
      break;
    //right arrow
    case "d":
      rightArrow = true;
      break;
    //up arrow
    case "w":
      upArrow = true;
      break;
    //down arrow
    case "s":
      downArrow = true;
      break;
    // fire key
    case "l":
      // creates a new missile putting it into the missiles array with the co-ordinates infront of the ship
      missiles.push(
        new Missile(ship.x + ship.width + 10, ship.y + ship.height / 2, 5)
      );

      // console.log('player is firing a missile')
      break;
  }
}
function handleKeyUp(event) {
  switch (event.key) {
    //Left arrow
    case "a":
      leftArrow = false;
      break;
    //right arrow
    case "d":
      rightArrow = false;
      break;
    //up arrow
    case "w":
      upArrow = false;
      break;
    //down arrow
    case "s":
      downArrow = false;
      break;
    //fire key
  }
}

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("hidden").classList.add("hidden");

  animate();
  spawnEnemies();
}

function reload() {
  window.location.reload();
}

play.addEventListener("click", startGame);
// playAgain.addEventListener('click', startGame)
playAgain.addEventListener("click", reload);

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

///////////////////////////////////////////////////
///////////////////////////////////////////////////
