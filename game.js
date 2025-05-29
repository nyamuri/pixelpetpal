let pet = JSON.parse(localStorage.getItem('pixelPal')) || {
  name: "Buddy",
  type: "dog",
  hunger: 50,
  happiness: 70,
  energy: 80
};

const petImage = document.getElementById("pet-image");
const hungerBar = document.getElementById("hunger");
const happinessBar = document.getElementById("happiness");
const energyBar = document.getElementById("energy");

function updateUI() {
  hungerBar.value = pet.hunger;
  happinessBar.value = pet.happiness;
  energyBar.value = pet.energy;
  document.getElementById('pet-name-display').textContent = pet.name || "Your Pet";
  petImage.src = pet.type === "cat" ? "assets/cat.png" : "assets/dog.png";
}

// Clamp value between 0 and 100
function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function feed() {
  pet.hunger = clamp(pet.hunger + 20);
  savePet();
  updateUI();
}

function play() {
  pet.happiness = clamp(pet.happiness + 20);
  savePet();
  updateUI();
}

function sleep() {
  pet.energy = clamp(pet.energy + 20);
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

// Start
updateUI();
setInterval(decayStats, 5000); // Every 5 seconds
