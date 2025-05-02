document.getElementById('toggleThemeButton').addEventListener('click', function () {
  this.classList.toggle('toggle-theme-button-checked');
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
});
