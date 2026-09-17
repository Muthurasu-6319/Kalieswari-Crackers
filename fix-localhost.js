import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    if (content.includes("'http://localhost:3001/api'")) {
      content = content.replace(/'http:\/\/localhost:3001\/api'/g, "`http://${window.location.hostname}:3001/api`");
      changed = true;
    }
    
    if (content.includes("'http://localhost:3001'")) {
      content = content.replace(/'http:\/\/localhost:3001'/g, "`http://${window.location.hostname}:3001`");
      changed = true;
    }
    
    if (content.includes("`http://localhost:3001${")) {
      content = content.replace(/`http:\/\/localhost:3001\$\{/g, "`http://${window.location.hostname}:3001${");
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
