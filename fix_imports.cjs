const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/from ['"]\.\.\/components\//g, "from '../mobile-components/");
            content = content.replace(/from ['"]\.\.\/types['"]/g, "from '../mobile-types'");
            content = content.replace(/from ['"]\.\.\/services\//g, "from '../mobile-services/");

            content = content.replace(/from ['"]\.\/components\//g, "from './mobile-components/");
            content = content.replace(/from ['"]\.\/pages\//g, "from './mobile-pages/");

            fs.writeFileSync(fullPath, content);
            console.log('Fixed:', fullPath);
        }
    }
}

replaceInDir('C:/Users/admin/sagedo-website/client/src/mobile-pages');
replaceInDir('C:/Users/admin/sagedo-website/client/src/mobile-components');
