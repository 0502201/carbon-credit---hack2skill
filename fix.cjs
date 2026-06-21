const fs = require('fs');
const path = require('path');
const glob = require('fs').readdirSync('src', { recursive: true }).filter(f => f.endsWith('.jsx'));

glob.forEach(f => {
  const fullPath = path.join('src', f);
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(/import React, \{ (.*?) \} from 'react';/, "import { $1 } from 'react';");
  content = content.replace(/import React(?: from 'react';)?\n?/, "");
  fs.writeFileSync(fullPath, content);
});
