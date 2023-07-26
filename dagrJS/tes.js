// let x = () => {
//     return 'kontol';
// };
// x.prop = 'Hi';
// console.dir(x.prop)

// let x = [];
// x.kontol = 21;
// console.dir(x);

// let x = 20

class MyEventTarget extends EventTarget {
    constructor(mySecret) {
        super();
        this._secret = mySecret;
    }

    get secret() {
        return this._secret;
    }
}

let myEventTarget = new MyEventTarget(5);
let value = myEventTarget.secret(); // === 5
console.log(value);