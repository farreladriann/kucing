const data = {};
data.employees = require('./data/employees.json');

// console.log(data);
const jsonString = JSON.stringify(data.employees, null, 4);
console.log(jsonString);