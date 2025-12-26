
const fs = require('fs');
const https = require('https');

const fetchFile = (url, path) => {
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            fs.writeFileSync(path, data);
            console.log(`Fetched ${path}`);
        });
    }).on('error', (err) => {
        console.error(`Error fetching ${path}: ${err.message}`);
    });
};

fetchFile('https://www.shadcn.io/registry/navigation-menu.json', 'temp_nav_menu.json');
fetchFile('https://www.shadcn.io/registry/popover.json', 'temp_popover.json');
