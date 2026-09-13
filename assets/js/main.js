// excogita.al - section tracking, copy-to-clipboard and accordion fallback.
(() => {
  'use strict';

  // ── section index ──────────────────────────────────────────────────────
  const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  function markCurrentSection(id) {
    for (const link of sectionLinks) {
      if (link.hash === `#${id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  if (sections.length) {
    const hashTarget = sectionLinks.find((link) => link.hash === window.location.hash);
    markCurrentSection(hashTarget ? hashTarget.hash.slice(1) : sections[0].id);

    for (const link of sectionLinks) {
      link.addEventListener('click', () => markCurrentSection(link.hash.slice(1)));
    }

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) markCurrentSection(visible[0].target.id);
      }, { rootMargin: '-22% 0px -60% 0px' });

      for (const section of sections) sectionObserver.observe(section);
    }
  }

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
