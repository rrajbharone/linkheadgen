import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://linkheadgen.com',
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude error pages from sitemap listing
        return !page.includes('/404') && !page.includes('/500');
      },
      serialize(item) {
        // Map priority and change frequency per page specifications
        if (item.url === 'https://linkheadgen.com/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (
          item.url.includes('/about') ||
          item.url.includes('/privacy') ||
          item.url.includes('/terms') ||
          item.url.includes('/disclaimer') ||
          item.url.includes('/contact')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        } else {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        }
        return item;
      }
    })
  ]
});
