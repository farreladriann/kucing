const os = require('os');
const path = require('path');
const mathalt = require('./mathalt')
const { divide } = require('./mathalt')
const { multiply } = require('./mathalt')
const math = require('./math')
// const { multiply } = require('./math') // gakbisa karena udah dideklarasi sebelumnya

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.join(__dirname));

console.log(path.parse(__filename));
console.log(path.parse(__filename).name);

console.log(mathalt);
console.log(divide);
console.log(multiply);

console.log(multiply(8, 9));