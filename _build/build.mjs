import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PAGES } from './pages.mjs';
const root = new URL('..', import.meta.url).pathname;
for (const [f, fn] of Object.entries(PAGES)) { const p = join(root, f); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, fn()); console.log('wrote', f); }
