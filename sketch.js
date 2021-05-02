// Global Variables.
let gameState = "start";
let backgroundImg,
  spaceShipImg,
  rock1,
  rock2,
  rock3,
  blastImg,
  gameRestartImg,
  gameOverImg;
let spaceShip,
  ground,
  score,
  form,
  rock,
  blast,
  rockGroup,
  gameRestart,
  gameOver,
  blastGroup;

// Loading the Assets.
function preload(params) {
  backgroundImg = loadImage("src/assets/space.png");
  spaceShipImg = loadImage("src/assets/spaceship.png");
  blastImg = loadImage("src/assets/blast.png");
  rock1 = loadImage("src/assets/as1.png");
  rock2 = loadImage("src/assets/as2.png");
  rock3 = loadImage("src/assets/as3.png");
  gameRestartImg = loadImage("src/assets/gameRestart.png");
  gameOverImg = loadImage("src/assets/gameOver.png");
}

function setup(params) {
  const canvas = createCanvas(windowWidth, windowHeight);

  // The Sprites.
  ground = createSprite(displayWidth / 2 + 75, displayHeight / 2);
  ground.addImage("background", backgroundImg);

  spaceShip = createSprite(displayWidth / 2, displayHeight / 1.5);
  spaceShip.addImage("spaceship", spaceShipImg);
  spaceShip.scale = 0.4;

  gameRestart = createSprite(width / 2, height / 2);
  gameRestart.addImage("gameRestart", gameRestartImg);
  gameRestart.visible = false;
  gameRestart.scale = 0.2;
  gameRestart.depth = spaceShip.depth + 1;

  gameOver = createSprite(width / 2, height / 2 - 200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  gameOver.depth = spaceShip.depth + 1;

  rockGroup = createGroup();
  blastGroup = createGroup();

  // The score and form
  score = 0;
  form = new Form();
  form.display();
}

function draw(params) {
  // The Background.
  background(backgroundImg);

  // The main game
  if (gameState === "play") {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityY = 4 + (3 * score) / 100;
    if (ground.y > width / 2) {
      ground.y = ground.height / 2;
    }

    // The Rocks
    spawnRocks();

    // Player Movement
    if (keyIsDown(LEFT_ARROW)) {
      spaceShip.x -= 7;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      spaceShip.x += 7;
    }

    // Game End
    if (spaceShip.isTouching(rockGroup)) {
      gameState = "end";
      spawnBlast();
    }
  } else if (gameState === "end") {
    ground.velocityY = 0;
    gameRestart.visible = true;
    gameOver.visible = true;
    rockGroup.setVelocityYEach(0);
    if (mousePressedOver(gameRestart)) {
      restart1();
      blastGroup.destroyEach();
    }
  }

  // Making all the Sprites visible
  if (gameState === "play" || gameState === "end") {
    drawSprites();
  }
}

function spawnRocks(params) {
  if (frameCount % 40 === 0) {
    rock = createSprite(0, 0);
    rock.x = Math.floor(random(width));
    rock.velocityY = 5;
    rock.scale = 0.5;
    rock.rotate = 60;
    rock.lifetime = width / 5;
    rockGroup.add(rock);
    rock.rotateToDirection = true;
    rock.setCollider("circle", 0, 0, rock.width);
    rock.depth = spaceShip.depth;
    let r = Math.floor(random(3));
    switch (r) {
      case 1:
        rock.addImage("rock1", rock1);
        break;
      case 2:
        rock.addImage("rock2", rock2);
        break;
      case 0:
        rock.addImage("rock3", rock3);
        break;

      default:
        break;
    }
  }
}

function spawnBlast() {
  blast = createSprite(0, 0);
  blast.addImage("blast", blastImg);
  blast.y = spaceShip.y;
  blast.x = spaceShip.x;
  blast.depth = spaceShip.depth;
  blastGroup.add(blast);
}

function restart1(params) {
  gameState = "play";
  gameRestart.visible = false;
  gameOver.visible = false;
  rockGroup.destroyEach();
  score = 0;
  ground.velocityY = 1;
}
