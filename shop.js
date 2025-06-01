let pet = JSON.parse(localStorage.getItem("pixelPal")) || { coins: 0, type: "dog" };
const coinDisplay = document.getElementById("coin-count");
const petImg = document.getElementById("shop-pet");

// Set pet image
petImg.src = pet.type === "cat" ? "assets/cat.png" : "assets/dog.png";
coinDisplay.textContent = `Coins: ${pet.coins || 0}`;

// Tab switching logic
function switchTab(tabName) {
  document.querySelectorAll(".shop-section").forEach(section => {
    section.classList.remove("active");
  });
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}
