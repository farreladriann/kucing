class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Add the greet method
  greet(){
    console.log("Hello");
  }
  
}

const animal = new Animal("Leo", 3);

console.log(`Name: ${animal.name}`);
console.log(`Age: ${animal.age}`);

// Call the greet method of the animal instance
animal.greet();
