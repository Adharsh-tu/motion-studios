#!/usr/bin/env node
/**
 * Command-line Figma Asset Importer
 * Usage:
 *   node scripts/import-figma.js --file ~/storage/downloads/icon.svg --name BrandIcon
 */

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
const nameIdx = args.indexOf('--name');

if (fileIdx === -1 || !args[fileIdx + 1]) {
  console.log('Usage: node scripts/import-figma.js --file <path-to-svg> [--name ComponentName]');
  process.exit(1);
}

const inputPath = path.resolve(args[fileIdx + 1]);
const compName = nameIdx !== -1 && args[nameIdx + 1] ? args[nameIdx + 1] : 'FigmaAsset';

if (!fs.existsSync(inputPath)) {
  console.error(`Error: File '${inputPath}' does not exist.`);
  process.exit(1);
}

const svgRaw = fs.readFileSync(inputPath, 'utf8');

// Basic sanitization
const cleanSvg = svgRaw
  .replace(/<\?xml.*\?>/gi, '')
  .replace(/<!--.*-->/gi, '')
  .trim();

const targetDir = path.resolve('src/assets/imported');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetFile = path.join(targetDir, `${compName}.tsx`);

const componentTemplate = `import React from 'react';

export const ${compName}: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <div className={className} style={style} dangerouslySetInnerHTML={{ __html: \`${cleanSvg}\` }} />
);
`;

fs.writeFileSync(targetFile, componentTemplate, 'utf8');
console.log(`Successfully imported Figma asset to: ${targetFile}`);
