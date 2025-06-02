let pet = JSON.parse(localStorage.getItem('pixelPet')) || {
  name: "Buddy",
  type: "dog",
  hunger: 50,
  happiness: 70,
  energy: 80,
  xp: 0,
  level: 1,
  coins: 0,
  background: "defaultbg.png"
};

const petImage = document.getElementById("pet-image");
const hungerBar = document.getElementById("hunger");
const happinessBar = document.getElementById("happiness");
const energyBar = document.getElementById("energy");
const xpBar = document.getElementById("xp");
const levelDisplay = document.getElementById("level-display");
const coinDisplay = document.getElementById("coin-count");

function updateUI() {
  hungerBar.style.width = pet.hunger + "%";
  happinessBar.style.width = pet.happiness + "%";
  energyBar.style.width = pet.energy + "%";
  xpBar.style.width = (pet.xp || 0) + "%";

  document.getElementById('pet-name-display').textContent = pet.name || "Your Pet";
  petImage.src = pet.type === "cat" ? "assets/cat.png" : "assets/dog.png";

  //code not supplied but change suggested by copilot to reduce repetition of getElementByID
  levelDisplay.textContent = `Level ${pet.level || 1}`;
  coinDisplay.textContent = `Coins: ${pet.coins || 0}`;

  const petBg = document.getElementById("pet-background");
  petBg.style.backgroundImage = `url('assets/${pet.background || "defaultbg.png"}')`;

  updateBarColour(hungerBar, pet.hunger);
  updateBarColour(happinessBar, pet.happiness);
  updateBarColour(energyBar, pet.energy);
}

function updateBarColour(bar, value) {
  if (value >= 50) {
    bar.style.backgroundColor = "green";
  } else if (value >= 20) {
    bar.style.backgroundColor = "orange";
  } else {
    bar.style.backgroundColor = "red";
  }
}

function boundary(value) {
  return Math.max(0, Math.min(100, value));
}

function gainXP(amount) {
  pet.xp = (pet.xp || 0) + amount;
  if (pet.xp >= 100) {
    pet.level = (pet.level || 1) + 1;
    pet.xp = pet.xp - 100;
    alert(`Yippee! Your pet leveled up to level ${pet.level}!`);
  }
  pet.xp = boundary(pet.xp);
}

//copilot cleaned up code below

function performAction(stat, amount, xpAmount = 5) {
  pet[stat] = boundary(pet[stat] + amount);
  gainXP(xpAmount);
  savePet();
  updateUI();
}

function feed() {
  performAction('hunger', 20);
}

function play() {
  performAction('happiness', 20);
}

function sleep() {
  performAction('energy', 20);
}

//copilot clean up end - original code in report

function walk() {
  window.location.href = 'walk.html';
}

function shop() {
  window.location.href = 'shop.html';
}

function decayStats() {
  pet.hunger = boundary(pet.hunger - 1);
  pet.happiness = boundary(pet.happiness - 1);
  pet.energy = boundary(pet.energy - 1);
  savePet();
  updateUI();
}

function savePet() {
  localStorage.setItem("pixelPet", JSON.stringify(pet));
}

updateUI();
setInterval(decayStats, 5000);
