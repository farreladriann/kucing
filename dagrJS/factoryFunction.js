const createPerson = (name, age) => {
    return {
        name: name,
        age: age,
        greet: function() {
            console.log('Hello, my name is ' + this.name + ' and I am ' + this.age + ' years old.');
        }
    };
}

var person1 = createPerson('John', 30);
var person2 = createPerson('Jane', 25);

person1.greet(); // Output: Hello, my name is John and I am 30 years old.
person2.greet(); // Output: Hello, my name is Jane and I am 25 years old.
