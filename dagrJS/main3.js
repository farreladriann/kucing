const myVariable = "Mathematics";

console.log(myVariable.length); // 11
console.log("Good Boy ganteng".length); // 16
console.log(myVariable.charAt(0)); // M
console.log(myVariable.charAt(6)); // a
console.log(myVariable.indexOf("mat")); // 5
console.log(myVariable.indexOf("Mat")); // 0
console.log(myVariable.indexOf("at")); // 1
console.log(myVariable.indexOf("ati"));// 6
console.log(myVariable.lastIndexOf("at")); // 6
console.log(myVariable.lastIndexOf("ath"));// 1
console.log(myVariable.slice(5, 8));// mat
console.log(myVariable.slice(5, 2));// <empty string>
console.log(myVariable.slice(5, 6));// m
console.log(myVariable.slice(3));// hematics
console.log(myVariable.toUpperCase());// MATHEMATICS
console.log(myVariable.toLowerCase());//mathematics
console.log(myVariable.includes("div"));//false
console.log(myVariable.includes("mat"));//true
console.log(myVariable.split("e"));// Array [ "Math", "matics" ]
console.log(myVariable.split("")); // Array(11) [ "M", "a", "t", "h", "e", "m", "a", "t", "i", "c", "s" ]
console.log("John,Joe,Dave".split(",")); //Array(3) [ "John", "Joe", "Dave" ]

