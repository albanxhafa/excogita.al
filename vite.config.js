import { defineConfig } from 'vite';

// The site is plain static files. Vite is only the dev server - Tailwind is
// compiled by its own CLI (see the `dev:css` script) so that
// assets/css/main.css stays a committed artifact the site deploys from with
// no build step.
export default defineConfig({
  root: '.',
  publicDir: false,
  server: { port: 4173, open: true },
});
