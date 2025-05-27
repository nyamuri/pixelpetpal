document.getElementById('adopt-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('pet-name').value.trim();
  const type = document.querySelector('input[name="pet"]:checked')?.value;

  if (!name || !type) {
    alert("Please enter a name and choose a pet.");
    return;
  }

  const pet = {
    name,
    type,
    hunger: 70,
    happiness: 70,
    energy: 70,
    adoptedAt: Date.now()
  };

  localStorage.setItem('pixelPal', JSON.stringify(pet));
  window.location.href = 'game.html';
});
