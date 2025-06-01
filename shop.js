let pet = JSON.parse(localStorage.getItem('pixelPal')) || {
  name: "Buddy",
  type: "dog",
  hunger: 50,
  happiness: 70,
  energy: 80,
  xp: 0,
  level: 1,
  coins: 100, // default if missing
  background: "bg1.png" // default background
};

const coinCount = document.getElementById("coin-count");
coinCount.textContent = `Coins: ${pet.coins || 0}`;

// Buy background function
function buyBackground(filename, cost) {
  if ((pet.coins || 0) >= cost) {
    pet.coins -= cost;
    pet.background = filename;
    alert(`Background set to ${filename.replace('.png', '')}!`);
    savePet();
    updateCoinDisplay();
  } else {
    alert("Not enough coins!");
  }
}

function updateCoinDisplay() {
  coinCount.textContent = `Coins: ${pet.coins}`;
}

function savePet() {
  localStorage.setItem('pixelPal', JSON.stringify(pet));
}

document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'game.html';
});
