import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { compile as compileSass } from 'sass';

function readFileSyncIfExists(filePath: string) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export function inlineComponentResources(): Plugin {
  return {
    name: 'vite:inline-angular-resources',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!/\.component\.(ts|js)$/.test(id)) return null;

      const dir = path.dirname(id);

      // inline templateUrl -> template
      code = code.replace(/templateUrl\s*:\s*['"](.+?)['"]/g, (m, templatePath) => {
        const full = path.resolve(dir, templatePath);
        const content = readFileSyncIfExists(full) || '';
        const safe = content.replace(/`/g, '\\`').replace(/\$\{/g, '\\\${');
        return `template: ` + '`' + safe + '`';
      });

      // inline styleUrls -> styles (compile scss if needed)
      code = code.replace(/styleUrls\s*:\s*\[([^\]]*)\]/g, (m, urls) => {
        const parts = Array.from(urls.matchAll(/['"](.+?)['"]/g)).map(r => r[1]);
        const styles: string[] = [];
        for (const p of parts) {
          const full = path.resolve(dir, p);
          const ext = path.extname(full).toLowerCase();
          const raw = readFileSyncIfExists(full) || '';
          let css = raw;
          if (ext === '.scss' || ext === '.sass') {
            try {
              const result = compileSass(full, { style: 'expanded' } as any);
              css = result.css.toString();
            } catch (e) {
              css = raw;
            }
          }
          const safe = css.replace(/`/g, '\\`').replace(/\$\{/g, '\\\${');
          styles.push('`' + safe + '`');
        }
        return `styles: [${styles.join(',')}]`;
      });

      return { code, map: null };
    },
  };
}

export default inlineComponentResources;
