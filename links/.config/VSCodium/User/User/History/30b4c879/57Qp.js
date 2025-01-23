document.addEventListener('DOMContentLoaded', function() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
});


function toggleTheme() {
  const currentTheme = localStorage.getItem('theme');

  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  localStorage.setItem('theme', newTheme);
}

function setClientTheme() {
  const currentTheme = localStorage.getItem('theme');

  document.documentElement.classList.toggle('dark', currentTheme === 'dark');
}
