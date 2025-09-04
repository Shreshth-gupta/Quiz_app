const fs = require('fs');
const path = require('path');

// Copy frontend build to root
const frontendBuild = path.join(__dirname, 'frontend', 'build');
const rootBuild = path.join(__dirname, 'build');

if (fs.existsSync(frontendBuild)) {
  fs.cpSync(frontendBuild, rootBuild, { recursive: true });
  console.log('Build copied to root');
}