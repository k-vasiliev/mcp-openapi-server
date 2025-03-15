#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import YAML from 'yaml';

// Read the YAML file
const yamlPath = process.argv[2] || './todoist.yaml';
const yamlContent = readFileSync(yamlPath, 'utf8');

// Parse YAML to JSON
try {
  const jsonContent = YAML.parse(yamlContent);
  
  // Write to a JSON file that the MCP server can read
  const jsonPath = yamlPath.replace(/\.ya?ml$/, '.json');
  writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
  
  console.log(`Successfully converted ${yamlPath} to ${jsonPath}`);
} catch (error) {
  console.error(`Error parsing YAML file: ${error.message}`);
  process.exit(1);
} 