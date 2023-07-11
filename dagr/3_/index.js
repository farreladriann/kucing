const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());

//belajar juga mengenai update npm di package.json
//kalo ^ cuma update minor ama patch
//* update semua
//~ cuma update patch