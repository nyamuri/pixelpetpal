let pet = JSON.parse(localStorage.getItem('pixelPal')) || {
  name: "Buddy",
  type: "dog",
  hunger: 50,
  happiness: 70,
  energy: 80,
  xp: 0,
  level: 1
};

const petImage = document.getElementById("pet-image");
const hungerBar = document.getElementById("hunger");
const happinessBar = document.getElementById("happiness");
const energyBar = document.getElementById("energy");
const xpBar = document.getElementById("xp");
const levelDisplay = document.getElementById("level-display");

function updateUI() {
  hungerBar.style.width = pet.hunger + "%";
  happinessBar.style.width = pet.happiness + "%";
  energyBar.style.width = pet.energy + "%";
  xpBar.style.width = (pet.xp || 0) + "%";

  document.getElementById('pet-name-display').textContent = pet.name || "Your Pet";
  petImage.src = pet.type === "cat" ? "assets/cat.png" : "assets/dog.png";

  levelDisplay.textContent = `Level ${pet.level || 1}`;

  // Change color of bars based on value for hunger, happiness, energy
  updateBarColor(hungerBar, pet.hunger);
  updateBarColor(happinessBar, pet.happiness);
  updateBarColor(energyBar, pet.energy);
  // XP bar stays pink
}

function updateBarColor(bar, value) {
  if (value >= 50) {
    bar.style.backgroundColor = "#4caf50"; // green
  } else if (value >= 20) {
    bar.style.backgroundColor = "#ff9800"; // orange
  } else {
    bar.style.backgroundColor = "#f44336"; // red
  }
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function gainXP(amount) {
  pet.xp = (pet.xp || 0) + amount;
  if (pet.xp >= 100) {
    pet.level = (pet.level || 1) + 1;
    pet.xp = pet.xp - 100; // carryover
    alert(`Congrats! Your pet leveled up to level ${pet.level}!`);
  }
  pet.xp = clamp(pet.xp);
}

function feed() {
  pet.hunger = clamp(pet.hunger + 20);
  gainXP(5);
  savePet();
  updateUI();
}

function play() {
  pet.happiness = clamp(pet.happiness + 20);
  gainXP(5);
  savePet();
  updateUI();
}

function sleep() {
  pet.energy = clamp(pet.energy + 20);
  gainXP(5);
  savePet();
  updateUI();
}

function walk() {
  window.location.href = 'walk.html';
}

function decayStats() {
  pet.hunger = clamp(pet.hunger - 1);
  pet.happiness = clamp(pet.happiness - 1);
  pet.energy = clamp(pet.energy - 1);
  savePet();
  updateUI();
}

function savePet() {
  localStorage.setItem("pixelPal", JSON.stringify(pet));
}

// Start the game UI
updateUI();
setInterval(decayStats, 5000); // Every 5 seconds
