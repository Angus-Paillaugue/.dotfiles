document.addEventListener('DOMContentLoaded', () => {
  setClientTheme();

  const toggleThemeButton = document.querySelector('#toggle-theme');
  toggleThemeButton.addEventListener('click', toggleTheme);
});


function toggleTheme() {
  const currentTheme = localStorage.getItem('theme');

  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  localStorage.setItem('theme', newTheme);

  setClientTheme();
}

function setClientTheme() {
  const theme =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);;
  document.documentElement.classList.toggle('dark', theme);
  console.log('theme', theme ? 'dark' : 'light');
}
