// excogita.al - copy-to-clipboard and an accordion fallback.
(() => {
  'use strict';

  // ── copy to clipboard ──────────────────────────────────────────────────
  const toast = document.getElementById('toast');
  let timer;

  function flash(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.opacity = '1';
    clearTimeout(timer);
    timer = setTimeout(() => { toast.style.opacity = '0'; }, 1800);
  }

  document.addEventListener('click', async (event) => {
    const trigger = event.target.closest('[data-copy-text]');
    if (!trigger) return;
    try {
      await navigator.clipboard.writeText(trigger.dataset.copyText);
      flash('Copied');
    } catch {
      flash('Press ⌘C to copy');
    }
  });

  // ── accordion ──────────────────────────────────────────────────────────
  // Modern browsers make <details name="..."> exclusive on their own. This
  // closes the siblings for the ones that do not, and is a no-op elsewhere.
  const exclusive = 'name' in document.createElement('details');

  if (!exclusive) {
    for (const panel of document.querySelectorAll('details[name]')) {
      panel.addEventListener('toggle', () => {
        if (!panel.open) return;
        for (const sibling of document.querySelectorAll(`details[name="${panel.name || panel.getAttribute('name')}"]`)) {
          if (sibling !== panel) sibling.open = false;
        }
      });
    }
  }
})();
