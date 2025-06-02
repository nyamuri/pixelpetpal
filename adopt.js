document.getElementById('adopt-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('pet-name').value.trim();
  
  const catRadio = document.getElementById('cat');
  const dogRadio = document.getElementById('dog');

  let type = null;
  if (catRadio.checked) {
    type = 'cat';
  } else if (dogRadio.checked) {
    type = 'dog';
  }

  if (!name || !type) {
    alert("Please enter a name and choose a pet.");
    return;
  }

  const pet = {
    name,
    type,
    hunger: 50,
    happiness: 70,
    energy: 80,
    xp: 0
  };

  localStorage.setItem('pixelPal', JSON.stringify(pet));
  window.location.href = 'game.html';
});
