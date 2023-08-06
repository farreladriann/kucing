// const tes = (callback) => {
//     const x = 20;
//     const y = () => {
//         console.dir(x)
//     };
//     console.dir(callback);
//     callback(x, y);
// }

// tes((y, x, m) => {
//     console.dir(y);
//     console.dir(x);
//     console.dir(m);
// });

// const tes = (x=undefined, y=undefined) => {
//     console.log(`${x} dan ${y}`);
// }

// tes(20, 30);
//===
// const express = require('express')
// const app = express()

// const hasil = app.get('/', (req, res) => {
//     console.log('mnatap');
//     res.json({ 'message': 'sada' });
// });

// console.dir(app);

// app.listen(3000, () => console.log('terhubung'));
//==
// const arr = [22, 4 ,65]

// const ubah = (callback) => {
//     for (let i = 0; i < arr.length; i++)
//         callback(arr[i+1]);
// }

// arr.forEach(val => val = 2);
// console.log(arr)
//====
class pro {
    constructor(callback) {
        const fn1 = (promValue) => {
            this.status = 'resolved';
            this.value = promValue;
        }
        const fn2 = (promValue) => {
            this.status = 'rejected';
            this.value = promValue;
        }
        callback(fn1, fn2);
    }
}

let ditepati = true;
const janji = new pro((resolve, reject) => {
    if (ditepati) resolve('diterima mantap');
    else reject('ditolak mampus');
});

console.dir(janji)

// console.dir(janji.value);

// const fn = (sk) => {
//     console.dir(sk);
// }

// fn();

// const dir = console.dir

// dir(new pro((resolve, reject) => {
//     if (ditepati) resolve('diterima mantap');
//     else reject('ditolak mampus');
// }));