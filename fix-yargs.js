#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const bundlePath = join(process.cwd(), 'dist', 'bundle.js');

try {
  // Read the bundle file
  let bundleContent = readFileSync(bundlePath, 'utf8');
  
  // Replace the yargs version option with srv-version
  bundleContent = bundleContent.replace(
    `.option("version",`,
    `.option("srv-version",`
  );
  
  // Replace any references to argv.version with argv["srv-version"]
  bundleContent = bundleContent.replace(
    /argv\.version/g, 
    'argv["srv-version"]'
  );
  
  bundleContent = bundleContent.replace(
    /argv\["version"\]/g, 
    'argv["srv-version"]'
  );
  
  // Disable the built-in version functionality
  bundleContent = bundleContent.replace(
    /(const argv = yargs.*?)\.help\(\)\.argv/,
    '$1.version(false).help().argv'
  );
  
  // Write the modified content back
  writeFileSync(bundlePath, bundleContent);
  console.log('Successfully patched bundle.js to fix yargs version issue');
} catch (error) {
  console.error(`Error patching bundle.js: ${error.message}`);
  process.exit(1);
} 