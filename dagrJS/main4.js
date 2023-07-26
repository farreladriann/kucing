const myNumber = 42;
const myFloat = 42.0;
const myFloat1 = 42.01;
const myString = "42";
const myString1 = "42.1234abc";

console.log(myNumber);
console.log(42.01);
console.log(myFloat);
console.log(myNumber === myFloat);
console.log(myNumber === myString);
console.log(myString + 3);
console.log(Number(myString) + 3);
console.log(Number(myString) === myNumber);
console.log(String(myNumber) + 3);
console.log(Number("Kucing"));
console.log(Number(undefined));
console.log(Number(true));
console.log(Number(false));
console.log(Number.parseFloat(myFloat));
console.log(Number.parseFloat(myString1));
console.log(Number.parseFloat(myString1).toFixed(2));

// NaN acronym for Not a Number