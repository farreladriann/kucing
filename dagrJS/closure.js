// windows sebagai global object
// let init = () => {
//     let nama = 'Kucing';
//     let tampilNama = () => {
//         console.log(nama);
//     }
//     tampilNama();
// }
// init();
// console.dir(init)
// let nama = 'kf0';
// function init () {
//     let nama = 'Kucing';
//     return function  () {
//         console.log(nama);
//     }
// }
// // console.dir(init)
// let x = init();
// console.dir(x);
//=====
// function ucapkanSalam(waktu) {
//     return function(nama) {
//         return `${nama} di waktu ${waktu}`;
//     }
// }

// let x = ucapkanSalam('20AM')
// console.dir(x);

let add = () => {
    let counter = 0;
    return function () {
        counter++;
        return counter;
    };
};
// console.log(add()());
// let counter = 0;
// let add = () => {
//     counter++;
//     return counter;
// };
// closure itu membawa dari lexical scope
// apa yang dia bawa itu
const dis = add();

console.dir(dis);
console.dir(dis());

const independentCopy = new Function('return (' + dis.toString() + ')()');
console.dir(independentCopy);
const indcopy = independentCopy();
console.dir(indcopy);

console.dir(dis());
console.dir(dis());

// console.dir(indcopy());
// console.dir(indcopy());
//==
// let x = (function() {
//     let counter = 0;
//     return function() {
//         counter++;
//         return counter;
//     }
// })();

// console.log(x());
// console.log(x());
// console.log(x());
// console.log(x());
// console.log(x());

// const obj = {
//     x: 20
// }

// const newobj = obj;
// newobj.y = 19;
// console.log(obj);