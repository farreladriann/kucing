// const myObj = {
//     nama: "Safika"
// }

// console.log(myObj.nama)

// const anotherObj = {
//     alive: true,
//     answer: 42,
//     hobbies: ["Eat", "Sleep", "Code"],
//     beverage: {
//         morning: "Coffe",
//         afternoon: "Iced Tea"
//     },
//     action: function() {
//         return `Time for ${this.beverage.morning}`;
//     }
// };

// console.log(anotherObj.action());

//========

// const vehicle = {
//     wheels: 4,
//     engine: function() {
//         return "Vroooom";
//     }
// }

// const truck = Object.create(vehicle);
// truck.doors = 2;
// console.log(truck);
// console.log(truck.wheels); //inheritance
// console.log(truck.engine());

// const car = Object.create(vehicle);
// car.doors = 4;
// car.engine = function() {
//     return "Whoos";
// };
// console.log(car.engine());
// console.log(car.wheels);

// const tesla = Object.create(car);
// console.log(tesla.wheels);
// console.log(tesla.engine());
// tesla.engine = function() {
//     return "Sshshh";
// }
// console.log(tesla.engine());

//=====

const band = {
    vocals: "Robert Plant",
    guitar: "Jimmy Page",
    bass: "John Paul Jones",
    drums: "John Bonham"
};

// console.log(Object.keys(band));
// console.log(Object.values(band));

// for (let job in band)
//     console.log(`On ${job}, it's ${band[job]}`);

// delete band.drums;

// console.log(Object.keys(band));
// console.log(Object.values(band));

// for (let job in band)
//     console.log(`On ${job}, it's ${band[job]}`);

// console.log(band.hasOwnProperty("drums"));

//======
//desctructring objects

// const { guitar: myVariable, bass: myBass } = band;
// console.log(myVariable);
// console.log(myBass);

// const { vocals, guitar, bass, drums } = band;
// console.log(guitar);
// console.log(vocals);

//=======

// function sing({ vocals }) {
//     return `${vocals} sings!`;
// }
// console.log(sing(band))