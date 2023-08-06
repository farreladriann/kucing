// let ditepati = false;
// const janji = new Promise((resolve, reject) => {
//     if (ditepati)
//         resolve('kontol');
//     else
//         reject('memek');
// });

// console.log(janji);
// // resolve ditangkap oleh then dan reject ditangkap oleh catch
// janji
//     .then(response => console.log('OK : ' + response))
//     .catch(response => console.log('NOT OK : ' + response));

// let ditepati = true;
// const janji2 = new Promise((resolve, reject) => {
//     if (ditepati) {
//         setTimeout(() => {
//             resolve('Ditetapi');
//         }, 0);
//     } else {
//         setTimeout(() => {
//             reject('dikontolin');
//         }, 0);
//     }
// })

// // resolve ditangkap oleh then dan reject ditangkap oleh catch
// janji2
//     .finally(() => console.log('kontol'))
//     .then(response => console.log('OK : ' + response))
//     .catch(response => console.log('NOT OK : ' + response));
// console.dir('mulai');
// console.dir('selesai');

console.log('mulali')
const film = new Promise(resolve => {
    resolve([{
            judul: 'as',
            sutradara: 20
        }]);
})
console.log(film);
film.then(response => console.log(response));
console.log('mulali')

// const cuaca = new Promise(resolve => {
//     setTimeout(() => {
//         resolve([{
//             kota: 'bdg',
//             temp: 29
//         }])
//     }, 500);
// });

console.log(film);

film.then(response => console.log(response));
// cuaca.then(response => console.log(response));
