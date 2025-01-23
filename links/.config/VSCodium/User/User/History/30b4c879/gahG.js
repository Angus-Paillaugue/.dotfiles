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

  console.log(`Theme set to ${newTheme}`);

}

function setClientTheme() {
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}
