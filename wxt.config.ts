import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    manifest_version: 3,
    content_scripts: [
      {
        matches: ['https://*.linkedin.com/*'], 
        js: ['content.ts'] 
      }
    ],
    permissions: ['storage', 'tabs', 'scripting'],
    host_permissions: ['https://*.linkedin.com/*'],
    background: {
      service_worker: 'background.ts'
    }
  }
});

