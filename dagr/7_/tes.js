const fs = require('fs');
const path = require('path');
fs.appendFile(path.join(__dirname, 'logs', 'reqLog.txt'), 'kucing', (err) => {
    if (err) throw err;
});