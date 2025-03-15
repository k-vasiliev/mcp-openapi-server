#!/usr/bin/env node

import { writeFileSync } from 'node:fs';

// Создаем скрипт для запуска в контейнере
const debugScript = `
#!/bin/sh
echo "=== Environment Variables ==="
env | sort
echo

echo "=== Files in /app ==="
ls -la /app
echo

echo "=== Content of /app/bin/mcp-server.js ==="
cat /app/bin/mcp-server.js
echo

echo "=== Content of bundle.js (first 100 lines) ==="
head -n 100 /app/dist/bundle.js
echo

echo "=== Starting server with debug info ==="
node --inspect ./bin/mcp-server.js --api-base-url https://api.todoist.com/rest/v2 --openapi-spec ./todoist.json --name todoist-mcp-server --srv-version 1.0.0 --verbose
`;

// Запись скрипта во временный файл
writeFileSync('debug-script.sh', debugScript, 'utf8');
console.log('Debug script created. Add this to your Dockerfile:');
console.log('COPY debug-script.sh /app/debug-script.sh');
console.log('RUN chmod +x /app/debug-script.sh');
console.log('CMD ["/app/debug-script.sh"]');

// Инструкции для пользователя
console.log(`
После добавления скрипта в Dockerfile и пересборки, в логах контейнера 
будет выведена отладочная информация, которая поможет найти проблему.
`); 