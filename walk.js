let pet, player, goal;
let catImg, dogImg, playerImg;

function preload() {
  catImg = loadImage("assets/cat.png");
  dogImg = loadImage("assets/dog.png");
}

function setup() {
  createCanvas(400, 400);

  pet = JSON.parse(localStorage.getItem("pixelPal")) || { type: "dog", xp: 0 };
  playerImg = pet.type === "cat" ? catImg : dogImg;

  player = createVector(40, 40);
  goal = createVector(360, 360);
}

function draw() {
  background(240);

  // Maze layout (basic border)
  stroke(0);
  noFill();
  rect(20, 20, 360, 360);

  // Draw the goal
  fill("yellow");
  ellipse(goal.x, goal.y, 30, 30);

  // Draw the player (pet image)
  image(playerImg, player.x - 16, player.y - 16, 32, 32); // center the image

  // Reached goal?
  if (dist(player.x, player.y, goal.x, goal.y) < 20) {
    pet.xp = (pet.xp || 0) + 10;
    localStorage.setItem("pixelPal", JSON.stringify(pet));
    window.location.href = "game.html";
  }
}

function keyPressed() {
  const speed = 5;
  if (keyCode === UP_ARROW) player.y -= speed;
  if (keyCode === DOWN_ARROW) player.y += speed;
  if (keyCode === LEFT_ARROW) player.x -= speed;
  if (keyCode === RIGHT_ARROW) player.x += speed;
}
