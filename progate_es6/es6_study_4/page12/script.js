class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log("Hello");
  }
  
  info(){
    this.greet();
    console.log(`My name is ${this.name}`);
    console.log(`I'm ${this.age} years old`);
  }
}

class Dog extends Animal {
  // Add the getHumanAge method
  getHumanAge(){
    return this.age*7;
  }
  
}

const dog = new Dog("Leo", 4);
dog.info();

// Call the getHumanAge of the dog instance
const humanAge = dog.getHumanAge();

// Print 「I am ____ years old in human years」
console.log(`I am ${humanAge} years old in human years`);
