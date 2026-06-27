// Theme switcher — persists in localStorage
(function() {
  const THEMES = ['dark', 'white', 'cat'];
  const LABELS = { dark: '🌙', white: '☀', cat: '🐱' };
  const stored = localStorage.getItem('learnix-theme') || 'dark';

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? '' : theme);
    if (theme === 'dark') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-dot').forEach(d => {
      d.classList.toggle('active', d.dataset.theme === theme);
    });
    localStorage.setItem('learnix-theme', theme);
  }

  function inject() {
    const nav = document.querySelector('nav');
    if (!nav || document.querySelector('.theme-toggle')) return;

    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.title = 'Switch theme';
    THEMES.forEach(t => {
      const dot = document.createElement('div');
      dot.className = 'theme-dot';
      dot.dataset.theme = t;
      dot.title = t;
      dot.textContent = LABELS[t];
      dot.onclick = () => apply(t);
      toggle.appendChild(dot);
    });
    nav.appendChild(toggle);
    apply(stored);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  // Apply stored theme ASAP to avoid flash
  if (stored !== 'dark') {
    document.documentElement.setAttribute('data-theme', stored);
  }
})();
