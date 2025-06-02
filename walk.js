let pet, player, goal, playerImg;
let catImg, dogImg, houseImg;
let mazeGrid = [];
const rows = 15;
const cols = 15;

let cellSize;
let coinPositions = [];
let coinCount = 0;

function preload() {
  catImg = loadImage("assets/cat.png");
  dogImg = loadImage("assets/dog.png");
  houseImg = loadImage("assets/house.png");
}

function setup() {
  const container = document.getElementById('container');
  const containerWidth = container.clientWidth;
  cellSize = Math.floor(containerWidth / cols);

  let canvas = createCanvas(cellSize * cols, cellSize * rows);

  canvas.parent(container);
  canvas.style('display', 'block');
  canvas.style('margin', '0 auto');

  pet = JSON.parse(localStorage.getItem("pixelPet")) || { type: "dog", xp: 0 };
  playerImg = pet.type === "cat" ? catImg : dogImg;

  mazeGrid = generateMaze(rows, cols);
  player = createVector(1, 1);
  goal = createVector(cols - 2, rows - 2);

  coinCount = floor(random(1, 6)); // 1–5 coins
  spawnCoins(coinCount);
}


function draw() {
  background(102, 205, 170);
  drawMaze();

  fill('yellow');
  noStroke();
  for (let coin of coinPositions) {
    ellipse(coin.x * cellSize + cellSize / 2, coin.y * cellSize + cellSize / 2, 15, 15);
  }

  imageMode(CENTER);
  image(houseImg, goal.x * cellSize + cellSize / 2, goal.y * cellSize + cellSize / 2, 30, 30);

  imageMode(CORNER);
  image(playerImg, player.x * cellSize + 4, player.y * cellSize + 4, cellSize - 8, cellSize - 8);

  collectCoin();

  if (player.x === goal.x && player.y === goal.y) {
    pet.xp = (pet.xp || 0) + 10;
    pet.happiness = (pet.happiness || 0) + 10;
    pet.energy = (pet.energy || 0) - 10;
    localStorage.setItem("pixelPet", JSON.stringify(pet));
    window.location.href = "game.html";
  }
}

function keyPressed() {
  let nextX = player.x;
  let nextY = player.y;

  if (keyCode === UP_ARROW) nextY--;
  if (keyCode === DOWN_ARROW) nextY++;
  if (keyCode === LEFT_ARROW) nextX--;
  if (keyCode === RIGHT_ARROW) nextX++;

  if (mazeGrid[nextY][nextX] === 0) {
    player.x = nextX;
    player.y = nextY;
  }
}

function drawMaze() {
  stroke(0);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (mazeGrid[y][x] === 1) {
        fill(50);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function generateMaze(rows, cols) {
  let maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  function carve(x, y) {
    const directions = shuffle([
      [0, -1], [1, 0], [0, 1], [-1, 0]
    ]);

    for (const [dx, dy] of directions) {
      const nx = x + dx * 2;
      const ny = y + dy * 2;

      if (ny > 0 && ny < rows - 1 && nx > 0 && nx < cols - 1 && maze[ny][nx] === 1) {
        maze[y + dy][x + dx] = 0;
        maze[ny][nx] = 0;
        carve(nx, ny);
      }
    }
  }

  maze[1][1] = 0;
  carve(1, 1);
  return maze;
}

//The maze 'carving' code above was inspired by Jamis' article on recursive backtracking
//Author: Jamis Buck
//Location: https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking
//Accessed: 01/06/2025

function isCoinAtPosition(x, y) {
  for (let i = 0; i < coinPositions.length; i++) {
    if (coinPositions[i].x === x && coinPositions[i].y === y) {
      return true;
    }
  }
  return false;
}

function spawnCoins(numCoins) {
  coinPositions = [];
  while (coinPositions.length < numCoins) {
    let x = floor(random(1, cols - 1));
    let y = floor(random(1, rows - 1));

    if (mazeGrid[y][x] === 0 && !isCoinAtPosition(x, y) && !(x === player.x && y === player.y) && !(x === goal.x && y === goal.y)) {
      coinPositions.push(createVector(x, y));
    }
  }
}

function collectCoin() {
  for (let i = coinPositions.length - 1; i >= 0; i--) {
    let coin = coinPositions[i];
    if (coin.x === player.x && coin.y === player.y) {
      coinPositions.splice(i, 1);
      pet.coins = (pet.coins || 0) + 1;
      localStorage.setItem("pixelPet", JSON.stringify(pet));
      break;
    }
  }
}
