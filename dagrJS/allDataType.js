const num = 20;
const str = "Kucing";
const bol = true;
const und = undefined;
const nul = null;
const arr = [];
const anotherObj = {
    alive: true,
    answer: 42,
    hobbies: ["Eat", "Sleep", "Code"],
    beverage: {
        morning: "Coffe",
        afternoon: "Iced Tea",
    },
};

//fungsi2
const RegFunc = () => {
    return 2;
};
const ArrFunc = () => {
    return 2;
};
function FungsiDeklarasi() {
    return "Fungsi Deklarasi";
}
function processUserInput(callback) {
    console.dir(callback);
}
function ConstructorFunction(name, age) {
    this.name = name;
    this.age = age;
}
function* generatorFunction() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

console.dir(num);
console.dir(str);
console.dir(bol);
console.dir(und);
console.dir(nul);
console.dir(arr);
console.dir(anotherObj);

console.dir('fungsi2');

console.dir(RegFunc);
console.dir(ArrFunc);
processUserInput(() => {
    return "Hallo";
});
console.dir(ConstructorFunction("kucing", "garong"));
console.dir(generatorFunction);

// yg punya prototype cuma object sama arr
