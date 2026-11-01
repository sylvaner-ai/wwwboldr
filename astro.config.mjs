import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';
import sitemap from '@astrojs/sitemap';

// Typographie française appliquée au texte des pages générées :
// apostrophes courbes et espaces insécables, sans toucher aux balises ni aux scripts.
function typographie() {
  const corriger = (texte) =>
    texte
      .replace(/&#x27;|&#39;|'/g, '’')
      .replace(/ ([:;?!»])/g, '\u00a0$1')
      .replace(/« /g, '«\u00a0');
  return {
    name: 'typographie-fr',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        for (const { pathname } of pages) {
          const fichier = new URL(pathname === '404/' ? '404.html' : `${pathname}index.html`, dir);
          const html = await readFile(fichier, 'utf-8');
          const morceaux = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/);
          const sortie = morceaux.map((m, i) => (i % 2 === 0 ? corriger(m) : m)).join('');
          await writeFile(fichier, sortie);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://boldr.fr',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  // Le français est servi à la racine ; ajouter 'en' ici pour ouvrir l'anglais.
  i18n: { defaultLocale: 'fr', locales: ['fr'], routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ filter: (page) => !page.includes('/merci/') }), typographie()],
  // La CSP du site interdit les scripts en ligne : aucun script n'est inliné au build.
  vite: { build: { assetsInlineLimit: 0 } },
});
