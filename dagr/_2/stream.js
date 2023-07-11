const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });
const ws = fs.createWriteStream('./files/anjinkk.txt');
// console.log(rs); 
// console.log(ws);

// di fungsi ini ws menulis dari rs
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// });

rs.pipe(ws);// sama kea sebelumnya tapi lebih efisien