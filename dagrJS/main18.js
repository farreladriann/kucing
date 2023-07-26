// // JS classes
// class Pizza {
//     constructor() {
//         this.size = "Medium";
//         this.crust = "original"
//     }
//     bake() {
//         console.log(`${this.size} ${this.crust} crust pizza`);
//     }
// }

// const myPizza = new Pizza;
// // console.log(typeof myPizza);
// // console.log(typeof Pizza);

//====
// Factory Function
function pizzaFactory(pizzaSize) {
    const crust = "original";
    const size = pizzaSize;
    return {
        bake: () => console.log(`Baking a ${size} ${crust}`),
    };
}

// const myPizza = pizzaFactory("small");
// myPizza.bake();

// //=====
// function createPerson(name, age) {
//     return {
//         name: name,
//         age: age,
//         sayHello: function () {
//             console.log("Hello, my name is " + this.name + ' and ' + this.age + ' years old');
//         },
//     };
// }

// let john = createPerson("John", 30);
// john.sayHello(); // Output: "Hello, my name is John"

//======= belajar private
// class Pizza {
//     crust = "original";
//     #sauce = "traditional";//private
//     #size;
//     constructor(pizzaSize) {
//         this.#size = pizzaSize;
//     }
//     getCrust() {
//         return this.crust;
//     }
//     setCrust(pizzaCrust) {
//         this.crust = pizzaCrust;
//     }
//     getSize() {
//         return this.#size;
//     }
//     hereYouGo() {
//         console.log(`Here's your ${this.crust} ${this.#sauce} sauce ${this.size} pizza.`)
//     }
// }

// const objPizza = new Pizza("medium");
// console.log(objPizza.crust);
// objPizza.crust = 'kucing';
// console.log(objPizza.size);
// console.log(objPizza.getSize());
// objPizza.hereYouGo();